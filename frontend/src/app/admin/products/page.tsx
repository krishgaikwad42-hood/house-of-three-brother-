"use client"
import { useState, useEffect } from 'react';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import { Search, Plus, Edit2, Trash2, Filter } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    mainCategory: string;
    subCategory: string;
    sizes: { size: string; available: boolean }[];
    images: { url: string; alt: string; isPrimary: boolean }[];
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products`);
            const result = await res.json();
            if (result.success) {
                setProducts(result.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products/${id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                fetchProducts();
            } else {
                alert(result.message || 'Delete failed');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.mainCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 py-6">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-[0.2em] text-[#111]">Inventory Management</h1>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-1">Manage your product catalog and availability</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH PRODUCTS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-14 w-[300px] border border-gray-100 bg-white px-12 text-[10px] font-bold uppercase tracking-widest focus:border-black transition-all outline-none"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setEditingProduct(undefined);
                            setShowForm(true);
                        }}
                        className="h-14 bg-black text-white px-8 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#222] transition-all active:scale-[0.98]"
                    >
                        <Plus size={16} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white border border-[#F5F5F5] overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Loading Inventory...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-20 text-center space-y-4">
                        <p className="text-[11px] uppercase font-bold tracking-[0.15em] text-[#888]">No products found</p>
                        <button
                            onClick={() => {
                                setEditingProduct(undefined);
                                setShowForm(true);
                            }}
                            className="text-[10px] text-black underline underline-offset-4 uppercase font-bold tracking-widest"
                        >
                            Create Your First Product
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-[#F5F5F5]">
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 w-1/3">Product Details</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Category</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Price</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Size Availability</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5F5F5]">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 relative">
                                                    {product.images[0]?.url ? (
                                                        <img
                                                            src={product.images[0].url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-[#888]">
                                                            <div className="w-4 h-[1px] bg-gray-300 mb-1" />
                                                            <span className="text-[7px] uppercase tracking-widest font-medium">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#111]">{product.name}</h3>
                                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest">SLUG: {product.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111]">{product.mainCategory}</span>
                                                {product.subCategory && (
                                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">{product.subCategory}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-medium text-gray-900">₹{product.price.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-1.5">
                                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => {
                                                    const isAvail = product.sizes?.find(s => s.size === size)?.available;
                                                    return (
                                                        <span
                                                            key={size}
                                                            className={`w-6 h-6 flex items-center justify-center text-[8px] font-bold border transition-colors
                                                                ${isAvail ? 'bg-black text-white border-black' : 'text-gray-300 border-gray-100 bg-gray-50/50'}`}
                                                        >
                                                            {size}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                                <button
                                                    onClick={() => {
                                                        setEditingProduct(product);
                                                        setShowForm(true);
                                                    }}
                                                    className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:border-black transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit2 size={14} className="text-[#111]" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showForm && (
                <AdminProductForm
                    product={editingProduct}
                    onClose={() => setShowForm(false)}
                    onSuccess={fetchProducts}
                />
            )}
        </div>
    );
}
