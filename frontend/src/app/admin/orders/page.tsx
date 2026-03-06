"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Eye, Filter, Clock, CheckCircle, Truck, Package, XCircle } from 'lucide-react';

interface Order {
    _id: string;
    orderNumber: string;
    customer: { name: string, email: string };
    total: number;
    orderStatus: string;
    paymentStatus: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/api/v1/orders`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const result = await res.json();
                if (result.success) {
                    setOrders(result.data);
                }
            } catch (error) {
                console.error('Error fetching admin orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-3 h-3" />;
            case 'confirmed': return <CheckCircle className="w-3 h-3" />;
            case 'shipped': return <Truck className="w-3 h-3" />;
            case 'delivered': return <Package className="w-3 h-3" />;
            case 'cancelled': return <XCircle className="w-3 h-3" />;
            default: return <Clock className="w-3 h-3" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-100';
            case 'delivered': return 'bg-green-50 text-green-700 border-green-100';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    if (loading) return <div className="p-20 text-center uppercase tracking-widest text-xs animate-pulse">Loading Orders...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-widest text-[#111]">Order Management</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Manage and track customer orders</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Order / Customer"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 border border-[#EAEAEA] pl-12 pr-6 text-xs focus:border-black outline-none transition-all w-[300px]"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#EAEAEA] shadow-sm overflow-hidden text-[11px]">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-[#EAEAEA] uppercase tracking-widest font-bold text-gray-500">
                        <tr>
                            <th className="px-6 py-5">Order #</th>
                            <th className="px-6 py-5">Customer</th>
                            <th className="px-6 py-5">Total</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5">Payment</th>
                            <th className="px-6 py-5">Date</th>
                            <th className="px-6 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F0F0]">
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-20 text-center text-gray-400 uppercase tracking-widest font-medium">No orders found</td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-5 font-bold">{order.orderNumber}</td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-black">{order.customer?.name || 'Guest'}</p>
                                        <p className="text-[10px] text-gray-400">{order.customer?.email}</p>
                                    </td>
                                    <td className="px-6 py-5 font-bold">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full font-bold uppercase tracking-tighter ${getStatusColor(order.orderStatus)}`}>
                                            {getStatusIcon(order.orderStatus)}
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`uppercase font-bold tracking-widest ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-400'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-5 text-right">
                                        <Link
                                            href={`/admin/orders/${order._id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-[#222] transition-colors font-bold uppercase tracking-widest"
                                        >
                                            <Eye className="w-3 h-3" /> View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
