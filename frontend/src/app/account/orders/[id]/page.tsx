"use client"
import { useState, useEffect, use } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { ChevronLeft, Package, MapPin, CreditCard, Clock } from 'lucide-react';

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
}

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const { user, isInitializing } = useAuthStore();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

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
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isInitializing && user) {
            fetchOrder();
        }
    }, [id, user, isInitializing]);

    if (loading) return <div className="p-20 text-center animate-pulse uppercase tracking-widest text-xs">Loading Order Details...</div>;
    if (!order) return <div className="p-20 text-center uppercase tracking-widest text-xs text-red-500">Order not found</div>;

    return (
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-10 md:py-16">
            <Link href="/account/orders" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-10 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Orders
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-[#111]">Order {order.orderNumber}</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{order.orderStatus}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">

                    {/* Items */}
                    <div className="bg-white border border-[#EAEAEA] p-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
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
                                        <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Size: {item.size} • Qty: {item.quantity}</p>
                                        <p className="text-sm font-medium mt-2">₹{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-[#EAEAEA] p-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-[#111]">
                                <MapPin className="w-4 h-4" /> Shipping Address
                            </h3>
                            <div className="text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
                                <p className="font-bold text-black">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.addressLine1}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                                <p className="mt-4">T: {order.shippingAddress.mobile}</p>
                            </div>
                        </div>
                        <div className="bg-white border border-[#EAEAEA] p-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-[#111]">
                                <CreditCard className="w-4 h-4" /> Payment Details
                            </h3>
                            <div className="text-[11px] text-gray-500 uppercase tracking-widest leading-loose">
                                <p><span className="text-gray-400">Method:</span> <span className="text-black font-bold ml-2">{order.paymentMethod}</span></p>
                                <p><span className="text-gray-400">Status:</span> <span className="text-black font-bold ml-2">{order.paymentStatus}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-6">
                    <div className="bg-white border border-[#EAEAEA] p-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-8 text-[#111]">Total Summary</h3>
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
                                <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                                <span className="text-xl font-bold">₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
