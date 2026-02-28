export function FilterSidebar() {
    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Category</h3>
                <ul className="space-y-3">
                    {['All categories', 'Shirts', 'T-Shirts', 'Trousers', 'Outerwear', 'Accessories'].map((cat) => (
                        <li key={cat}>
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black" />
                                <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{cat}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button key={size} className="h-10 border border-[#EAEAEA] text-xs hover:border-black hover:bg-black hover:text-white transition-all rounded-none uppercase">
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4">Availability</h3>
                <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-black border-gray-300 rounded-none focus:ring-black" />
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">In Stock Only</span>
                </label>
            </div>

        </div>
    );
}
