import Link from 'next/link';

export default function AdminDashboard() {
    // KPI Data (to be connected to real API later)
    const stats = [
        { name: 'Total Revenue', value: '₹0', change: '0%' },
        { name: 'Orders', value: '0', change: '0%' },
        { name: 'Customers', value: '0', change: '0%' },
        { name: 'Avg. Order', value: '₹0', change: '0%' }
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
                        <Link href="/admin/orders" className="text-[10px] text-black font-bold uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-300">No recent orders</p>
                    </div>
                </div>

                {/* Top Products placeholder */}
                <div className="bg-white border border-[#EAEAEA] shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-[#EAEAEA] pb-4">
                        <h3 className="text-lg font-bold uppercase tracking-widest">Top Products</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-300">No data available</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
