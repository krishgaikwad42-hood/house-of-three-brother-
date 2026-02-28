"use client"
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, getSummary } = useCartStore();
    const { subtotal } = getSummary();
    const shippingFlow = 0; // Free shipping for demo
    const total = subtotal + shippingFlow;

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Checkout</h1>
                <p className="mb-8 text-gray-500">Your cart is empty.</p>
                <Link href="/shop" className="btn-primary px-8 h-14 inline-flex items-center">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

            <div className="flex flex-col lg:flex-row gap-16">

                {/* Left: Checkout Form */}
                <div className="w-full lg:w-3/5 space-y-12">

                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#EAEAEA] pb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <input type="email" placeholder="Email address" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black" />
                                <span className="text-sm text-gray-600">Email me with news and offers</span>
                            </label>
                        </div>
                    </section>

                    {/* Shipping */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#EAEAEA] pb-4">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="First name" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                            <input type="text" placeholder="Last name" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                            <input type="text" placeholder="Address" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400 md:col-span-2" />
                            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400 md:col-span-2" />
                            <input type="text" placeholder="City" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                            <input type="text" placeholder="State/Province" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                            <input type="text" placeholder="PIN code" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                            <input type="text" placeholder="Phone" className="w-full h-12 px-4 border border-[#EAEAEA] focus:border-black focus:outline-none placeholder:text-gray-400" />
                        </div>
                    </section>

                    {/* Payment (Mock Razorpay placeholder) */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#EAEAEA] pb-4">Payment</h2>
                        <div className="p-6 border border-[#EAEAEA] bg-gray-50 flex flex-col items-center justify-center space-y-4">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                            <p className="text-sm text-gray-500 text-center">After clicking "Pay Now", you will be securely redirected to Razorpay to complete your purchase.</p>
                        </div>
                    </section>

                    <button className="btn-primary w-full h-14 text-base tracking-[0.15em] mt-8">
                        Complete Order
                    </button>

                </div>

                {/* Right: Order Summary */}
                <div className="w-full lg:w-2/5 p-8 bg-gray-50 border border-[#EAEAEA] h-fit sticky top-28">
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6 border-b border-[#EAEAEA] pb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-4 relative">
                                    <div className="w-16 h-20 bg-gray-200 border border-[#EAEAEA]">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute -top-2 -left-2 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] z-10">{item.quantity}</span>
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest line-clamp-1">{item.name}</h4>
                                        <span className="text-xs text-gray-500 uppercase tracking-widest">Size: {item.size}</span>
                                    </div>
                                </div>
                                <span className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 text-sm mb-6 border-b border-[#EAEAEA] pb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>{shippingFlow === 0 ? 'Free' : `₹${Number(shippingFlow).toLocaleString()}`}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end text-lg font-bold">
                        <span className="uppercase tracking-widest">Total</span>
                        <span className="text-2xl font-semibold">
                            <span className="text-xs text-gray-500 font-normal mr-2">INR</span>
                            ₹{Number(total).toLocaleString()}
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
}
