"use client"
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { ShoppingBag, ChevronRight, Package, Clock } from 'lucide-react';

interface Order {
    _id: string;
    orderNumber: string;
    total: number;
    orderStatus: string;
    createdAt: string;
    items: any[];
}

export default function OrderHistoryPage() {
    const { user, isInitializing } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/api/v1/orders/my-orders`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const result = await res.json();
                if (result.success) {
                    setOrders(result.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isInitializing && user) {
            fetchOrders();
        }
    }, [user, isInitializing]);

    if (loading) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-20 animate-pulse">
                <div className="h-8 bg-gray-100 w-48 mb-12" />
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-50 border border-[#EAEAEA]" />)}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Please login to view orders</h2>
                <Link href="/account/login" className="btn-primary inline-flex px-12 h-14 items-center">Login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-20">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#111]">Order History</h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{orders.length} Orders</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm uppercase tracking-widest">You haven't placed any orders yet</p>
                    <Link href="/shop" className="text-xs font-bold uppercase tracking-widest mt-6 inline-block underline underline-offset-4">Start Shopping</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white border border-[#EAEAEA] overflow-hidden hover:border-black transition-colors group">
                            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Package className="w-4 h-4 text-gray-400" />
                                        <span className="text-[11px] font-bold uppercase tracking-widest">Order {order.orderNumber}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                        <p className="text-sm font-bold">₹{order.total.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                                        <Clock className="w-3 h-3 text-gray-500" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">{order.orderStatus}</span>
                                    </div>
                                    <Link href={`/account/orders/${order._id}`} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#111] group-hover:translate-x-1 transition-transform">
                                        View Details <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
