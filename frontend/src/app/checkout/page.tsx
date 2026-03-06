"use client"
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, CreditCard, Truck, User, MapPin } from 'lucide-react';

export default function CheckoutPage() {
    const { items, getSummary, clearCart } = useCartStore();
    const { subtotal } = getSummary();
    const { user } = useAuthStore();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: user?.email || '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

    useEffect(() => {
        if (items.length === 0) {
            router.push('/shop');
        }

        // Load Razorpay Script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [items, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitShipping = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.pincode) {
            alert('Please fill all required fields');
            return;
        }
        setStep(2);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const orderData = {
                items: items.map(i => ({
                    product: i.productId,
                    size: i.size,
                    quantity: i.quantity,
                    price: i.price
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    mobile: formData.phone,
                    addressLine1: formData.addressLine1,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                    email: formData.email
                },
                paymentMethod,
                subtotal,
                shippingFee: subtotal > 2000 ? 0 : 100,
                total: subtotal + (subtotal > 2000 ? 0 : 100)
            };

            const res = await fetch(`${apiUrl}/api/v1/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await res.json();
            if (result.success) {
                if (paymentMethod === 'razorpay') {
                    // Trigger Razorpay
                    initiateRazorpay(result.data);
                } else {
                    alert('Order placed successfully (COD)');
                    clearCart();
                    router.push(`/account/orders/${result.data._id}`);
                }
            } else {
                alert(result.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const initiateRazorpay = (order: any) => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.total * 100,
            currency: "INR",
            name: "House of Three Brothers",
            description: "Order Checkout",
            order_id: order.paymentDetails.razorpayOrderId,
            handler: async function (response: any) {
                const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/payments/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                });
                const verifyResult = await verifyRes.json();
                if (verifyResult.success) {
                    alert('Payment successful!');
                    clearCart();
                    router.push(`/account/orders/${order._id}`);
                } else {
                    alert('Payment verification failed');
                }
            },
            prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#000000"
            }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    if (items.length === 0) return null;

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-10 pb-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

                {/* Header / Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-10">
                    <Link href="/shop" className="hover:text-black">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className={step === 1 ? 'text-black font-bold' : ''}>Shipping</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className={step === 2 ? 'text-black font-bold' : ''}>Payment</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Form Area */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        {step === 1 ? (
                            <form onSubmit={handleSubmitShipping} className="space-y-12 bg-white p-8 md:p-12 border border-[#EAEAEA]">
                                <div>
                                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">01</span>
                                        Shipping Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                                            <input
                                                type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">Phone Number</label>
                                            <input
                                                type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                                            <input
                                                type="email" name="email" required value={formData.email} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">Address Line 1</label>
                                            <input
                                                type="text" name="addressLine1" required value={formData.addressLine1} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">City</label>
                                            <input
                                                type="text" name="city" required value={formData.city} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">State</label>
                                            <input
                                                type="text" name="state" required value={formData.state} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold">Pincode</label>
                                            <input
                                                type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange}
                                                className="w-full h-14 border border-[#EAEAEA] px-4 text-sm focus:border-black outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-black text-white h-16 font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#222] transition-colors">
                                    Continue to Payment
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-8">
                                <div className="bg-white p-8 md:p-12 border border-[#EAEAEA]">
                                    <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">02</span>
                                        Payment Method
                                    </h2>
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setPaymentMethod('razorpay')}
                                            className={`w-full p-6 border flex items-center justify-between transition-all ${paymentMethod === 'razorpay' ? 'border-black bg-black/5' : 'border-[#F0F0F0] hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <CreditCard className="w-5 h-5" />
                                                <div className="text-left">
                                                    <p className="text-xs font-bold uppercase tracking-widest">Razorpay (Cards, UPI, Netbanking)</p>
                                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Secure online payment</p>
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'razorpay' ? 'border-black bg-black' : 'border-gray-200'}`} />
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod('cod')}
                                            className={`w-full p-6 border flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-black bg-black/5' : 'border-[#F0F0F0] hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Truck className="w-5 h-5" />
                                                <div className="text-left">
                                                    <p className="text-xs font-bold uppercase tracking-widest">Cash on Delivery</p>
                                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Pay when you receive</p>
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-black bg-black' : 'border-gray-200'}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="h-16 border border-[#EAEAEA] font-bold uppercase tracking-[0.2em] text-[10px] text-gray-400 hover:text-black hover:border-black transition-all"
                                    >
                                        Back to Shipping
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className="h-16 bg-black text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#222] transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Processing...' : `Place Order • ₹${(subtotal + (subtotal > 2000 ? 0 : 100)).toLocaleString()}`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-12 xl:col-span-4">
                        <div className="bg-white border border-[#EAEAEA] sticky top-[120px]">
                            <div className="p-8 border-b border-[#F0F0F0]">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-[#111]">Order Summary</h3>
                            </div>
                            <div className="p-8 space-y-6">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-20 bg-gray-50 border border-[#F0F0F0] flex-shrink-0 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-bold uppercase tracking-widest line-clamp-1">{item.name}</p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Size: {item.size} • Qty: {item.quantity}</p>
                                            <p className="text-xs font-medium mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-8 pb-8 space-y-4">
                                <div className="flex justify-between text-xs pt-6 border-t border-[#F0F0F0]">
                                    <span className="text-gray-400 uppercase tracking-widest">Subtotal</span>
                                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400 uppercase tracking-widest">Shipping</span>
                                    <span className="font-bold">{subtotal > 2000 ? 'FREE' : '₹100'}</span>
                                </div>
                                <div className="flex justify-between text-sm py-6 border-y border-[#F0F0F0] mt-4">
                                    <span className="font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-lg font-bold">₹{(subtotal + (subtotal > 2000 ? 0 : 100)).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
