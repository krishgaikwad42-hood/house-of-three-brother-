export default function AdminDashboard() {
    // Mock data for initial analytics load
    const stats = [
        { name: 'Total Revenue', value: '₹4,32,000', change: '+12.5%' },
        { name: 'Orders', value: '142', change: '+5.2%' },
        { name: 'Customers', value: '89', change: '+18.1%' },
        { name: 'Avg. Order', value: '₹3,042', change: '-2.1%' }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest mb-8">Dashboard Overview</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 border border-[#EAEAEA] shadow-sm">
                        <h3 className="text-sm text-gray-500 font-medium uppercase tracking-widest mb-2">{stat.name}</h3>
                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold">{stat.value}</span>
                            <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders List placeholder */}
                <div className="bg-white border border-[#EAEAEA] shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-[#EAEAEA] pb-4">
                        <h3 className="text-lg font-bold uppercase tracking-widest">Recent Orders</h3>
                        <button className="text-sm text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1042, 1041, 1040, 1039, 1038].map(order => (
                            <div key={order} className="flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-medium">#{order}</p>
                                    <p className="text-gray-500">2 hours ago</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">₹12,499</p>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Paid</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products placeholder */}
                <div className="bg-white border border-[#EAEAEA] shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-[#EAEAEA] pb-4">
                        <h3 className="text-lg font-bold uppercase tracking-widest">Top Products</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-gray-100"></div>
                            <div>
                                <p className="text-sm font-semibold uppercase">Oversized Linen Shirt</p>
                                <p className="text-xs text-gray-500">42 Sales this week</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-gray-100"></div>
                            <div>
                                <p className="text-sm font-semibold uppercase">Tailored Wool Trousers</p>
                                <p className="text-xs text-gray-500">28 Sales this week</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
