export default function AdminCustomers() {
    const customers = [
        { id: '1', name: 'Arjun Menon', email: 'arjun.menon@example.com', orders: 4, totalSpent: 42496, status: 'Active' },
        { id: '2', name: 'Rohan Sharma', email: 'rohan.s@example.com', orders: 1, totalSpent: 4999, status: 'Active' },
        { id: '3', name: 'Siddharth Rao', email: 'siddharth.r@example.com', orders: 2, totalSpent: 28497, status: 'Inactive' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest mb-8">Customers</h1>

            <div className="bg-white border border-[#EAEAEA] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-[#EAEAEA]">
                            <tr>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Customer Name</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Email</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Orders</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Total Spent</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEAEA]">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="px-6 py-4 font-medium">{customer.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4">{customer.orders}</td>
                                    <td className="px-6 py-4 font-medium">₹{customer.totalSpent.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {customer.status}
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
