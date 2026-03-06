"use client"
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Package, MapPin, CreditCard, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

interface Order {
    _id: string;
    orderNumber: string;
    items: any[];
    shippingAddress: any;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    subtotal: number;
    shippingFee: number;
    total: number;
    createdAt: string;
    customer: { name: string, email: string };
}

export default function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/api/v1/orders/${id}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const result = await res.json();
                if (result.success) {
                    setOrder(result.data);
                }
            } catch (error) {
                console.error('Error fetching admin order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const updateStatus = async (status: string) => {
        setUpdating(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/api/v1/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderStatus: status })
            });
            const result = await res.json();
            if (result.success) {
                setOrder(result.data);
                alert(`Order status updated to ${status}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-20 text-center uppercase tracking-widest text-xs animate-pulse">Loading Order...</div>;
    if (!order) return <div className="p-20 text-center uppercase tracking-widest text-xs text-red-500">Order not found</div>;

    const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    return (
        <div className="max-w-[1200px] mx-auto space-y-10">
            <Link href="/admin/orders" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-4 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Orders
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-[#111]">Order {order.orderNumber}</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    {statuses.map(status => (
                        <button
                            key={status}
                            disabled={updating || order.orderStatus === status}
                            onClick={() => updateStatus(status)}
                            className={`px-6 py-3 text-[9px] font-bold uppercase tracking-widest rounded transition-all
                                ${order.orderStatus === status
                                    ? 'bg-black text-white ring-2 ring-black ring-offset-2'
                                    : 'bg-white border border-[#EAEAEA] text-gray-400 hover:border-black hover:text-black'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">

                    {/* Items */}
                    <div className="bg-white border border-[#EAEAEA] p-8 shadow-sm">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-8 border-b border-[#F0F0F0] pb-4 flex items-center gap-3">
                            <Package className="w-4 h-4" /> Order Items
                        </h3>
                        <div className="divide-y divide-[#F0F0F0]">
                            {order.items.map((item, i) => (
                                <div key={i} className="py-6 flex gap-6 first:pt-0 last:pb-0">
                                    <div className="w-20 h-24 bg-gray-50 border border-[#F0F0F0] flex-shrink-0">
                                        <img src={item.product?.images?.[0]?.url || ''} alt={item.product?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest">{item.product?.name}</p>
                                        <div className="flex gap-4 mt-2">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Size: {item.size}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold mt-2">₹{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#EAEAEA] p-8 shadow-sm">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6 border-b border-[#F0F0F0] pb-4 flex items-center gap-3 text-[#111]">
                                <MapPin className="w-4 h-4" /> Shipping Address
                            </h3>
                            <div className="text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
                                <p className="font-bold text-black">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.addressLine1}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                                <p className="mt-4 font-bold text-black">Contact: {order.shippingAddress.mobile}</p>
                                <p className="text-[10px] lowercase tracking-normal">{order.shippingAddress.email}</p>
                            </div>
                        </div>
                        <div className="bg-white border border-[#EAEAEA] p-8 shadow-sm">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6 border-b border-[#F0F0F0] pb-4 flex items-center gap-3 text-[#111]">
                                <CreditCard className="w-4 h-4" /> Information
                            </h3>
                            <div className="space-y-6 text-[11px] uppercase tracking-widest">
                                <div>
                                    <p className="text-gray-400 mb-1">Customer</p>
                                    <p className="font-bold">{order.customer?.name || 'Guest'}</p>
                                    <p className="lowercase text-gray-400 tracking-normal">{order.customer?.email}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 mb-1">Payment</p>
                                        <p className="font-bold">{order.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 mb-1">Status</p>
                                        <p className={`font-bold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-400'}`}>{order.paymentStatus}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Totals */}
                <div className="space-y-6">
                    <div className="bg-white border border-[#EAEAEA] p-8 shadow-sm">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-8 border-b border-[#F0F0F0] pb-4 text-[#111]">Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[11px] uppercase tracking-widest">
                                <span className="text-gray-400">Subtotal</span>
                                <span className="font-bold">₹{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[11px] uppercase tracking-widest">
                                <span className="text-gray-400">Shipping</span>
                                <span className="font-bold">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
                            </div>
                            <div className="flex justify-between items-center pt-6 border-t border-[#F0F0F0] mt-6">
                                <span className="text-xs font-bold uppercase tracking-widest">Grand Total</span>
                                <span className="text-xl font-bold">₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-8 text-white space-y-4">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-gray-400" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Delivery Status</p>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-widest">
                            {order.orderStatus === 'pending' && "Awaiting confirmation."}
                            {order.orderStatus === 'confirmed' && "Order confirmed. Preparing for shipment."}
                            {order.orderStatus === 'shipped' && "Order has been handed over to courier."}
                            {order.orderStatus === 'delivered' && "Order has been successfully delivered."}
                            {order.orderStatus === 'cancelled' && "Order has been cancelled."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
