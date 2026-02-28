export default function AdminOrders() {
    const orders = [
        { id: '1042', customer: 'Arjun Menon', date: 'Oct 24, 2024', total: 12499, payment: 'Paid', status: 'Unfulfilled' },
        { id: '1041', customer: 'Rohan Sharma', date: 'Oct 23, 2024', total: 4999, payment: 'Paid', status: 'Fulfilled' },
        { id: '1040', customer: 'Siddharth Rao', date: 'Oct 22, 2024', total: 24998, payment: 'Refunded', status: 'Cancelled' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest mb-8">Orders</h1>

            <div className="bg-white border border-[#EAEAEA] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-[#EAEAEA]">
                            <tr>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Order</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Date</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Customer</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Total</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Payment Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Fulfillment</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEAEA]">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-blue-600">#{order.id}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4 font-medium">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded ${order.status === 'Fulfilled' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Unfulfilled' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-600 hover:text-black font-medium text-xs uppercase tracking-widest">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
