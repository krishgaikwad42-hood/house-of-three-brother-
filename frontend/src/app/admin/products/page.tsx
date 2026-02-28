export default function AdminProducts() {
    const products = [
        { id: '1', name: 'OVERSIZED LINEN SHIRT', sku: 'SHIRT-001', price: 4999, stock: 42, status: 'Active' },
        { id: '2', name: 'TAILORED WOOL TROUSERS', sku: 'TROUSER-001', price: 7999, stock: 28, status: 'Active' },
        { id: '3', name: 'CASHMERE BLEND SWEATER', sku: 'SWEATER-001', price: 12999, stock: 15, status: 'Low Stock' },
        { id: '4', name: 'TEXTURED COTTON BLAZER', sku: 'BLAZER-001', price: 15999, stock: 0, status: 'Out of Stock' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold uppercase tracking-widest">Products</h1>
                <button className="bg-black text-white px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    + Add Product
                </button>
            </div>

            <div className="bg-white border border-[#EAEAEA] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-[#EAEAEA]">
                            <tr>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Product</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">SKU</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Price</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Inventory</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEAEA]">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                                    <td className="px-6 py-4 font-medium">₹{product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4">{product.stock} in stock</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs rounded-full ${product.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs uppercase tracking-widest mr-4">Edit</button>
                                        <button className="text-red-500 hover:text-red-700 font-medium text-xs uppercase tracking-widest">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="px-6 py-4 border-t border-[#EAEAEA] flex justify-between items-center text-sm text-gray-500">
                    <span>Showing 1 to 4 of 4 entries</span>
                    <div className="flex gap-2">
                        <button className="border border-[#EAEAEA] px-3 py-1 disabled:opacity-50">Prev</button>
                        <button className="border border-[#EAEAEA] px-3 py-1 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
