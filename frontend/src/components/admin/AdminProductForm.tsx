"use client"
import { useState, useEffect } from 'react';
import { X, Upload, Trash2, CheckCircle2 } from 'lucide-react';

interface Product {
    _id?: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    mainCategory: string;
    subCategory: string;
    sizes: { size: string; available: boolean }[];
    images: { url: string; alt: string; isPrimary: boolean }[];
}

interface AdminProductFormProps {
    product?: Product;
    onClose: () => void;
    onSuccess: () => void;
}

const CATEGORIES = [
    { name: 'SHIRTS', subs: ['Half Shirts', 'Full Sleeve Shirts'] },
    { name: 'T-SHIRTS', subs: ['Regular', 'Oversize', 'Full Sleeve'] },
    { name: 'POLOS', subs: [] },
    { name: 'JEANS', subs: ['Straight Fit', 'Baggy', 'Bootcut', 'Korean Pants'] }
];

export function AdminProductForm({ product, onClose, onSuccess }: AdminProductFormProps) {
    const [formData, setFormData] = useState<Product>(product || {
        name: '',
        slug: '',
        description: '',
        price: 0,
        mainCategory: 'SHIRTS',
        subCategory: 'Half Shirts',
        sizes: [
            { size: 'S', available: true },
            { size: 'M', available: true },
            { size: 'L', available: true },
            { size: 'XL', available: true },
            { size: 'XXL', available: true }
        ],
        images: []
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSizeToggle = (size: string) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.map(s => s.size === size ? { ...s, available: !s.available } : s)
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeSelectedFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();

            // Append basic fields
            formDataToSend.append('name', formData.name);
            formDataToSend.append('slug', formData.slug || formData.name.toLowerCase().replace(/ /g, '-'));
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price.toString());
            formDataToSend.append('mainCategory', formData.mainCategory);
            formDataToSend.append('subCategory', formData.subCategory);

            // Append nested structures as JSON strings
            formDataToSend.append('sizes', JSON.stringify(formData.sizes));
            formDataToSend.append('images', JSON.stringify(formData.images));

            // Append new files
            selectedFiles.forEach(file => {
                formDataToSend.append('images', file);
            });

            const url = product?._id
                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products/${product._id}`
                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products`;

            const method = product?._id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                body: formDataToSend,
                // Add your auth headers here if needed
            });

            const result = await res.json();
            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.message || 'Operation failed');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold uppercase tracking-widest">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column: Details */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Product Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full h-12 border border-gray-100 px-4 text-sm focus:border-black transition-colors outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Price (₹)</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="w-full h-12 border border-gray-100 px-4 text-sm focus:border-black transition-colors outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Slug</label>
                                <input
                                    type="text"
                                    placeholder="auto-generated"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full h-12 border border-gray-100 px-4 text-sm focus:border-black transition-colors outline-none bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Main Category</label>
                                <select
                                    value={formData.mainCategory}
                                    onChange={e => setFormData({ ...formData, mainCategory: e.target.value, subCategory: CATEGORIES.find(c => c.name === e.target.value)?.subs[0] || '' })}
                                    className="w-full h-12 border border-gray-100 px-4 text-sm focus:border-black transition-colors outline-none appearance-none bg-white rounded-none"
                                >
                                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Sub Category</label>
                                <select
                                    value={formData.subCategory}
                                    onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                                    className="w-full h-12 border border-gray-100 px-4 text-sm focus:border-black transition-colors outline-none appearance-none bg-white rounded-none"
                                >
                                    {CATEGORIES.find(c => c.name === formData.mainCategory)?.subs.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                    {CATEGORIES.find(c => c.name === formData.mainCategory)?.subs.length === 0 && (
                                        <option value="">None</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-100 p-4 text-sm focus:border-black transition-colors outline-none resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Size Availability</label>
                            <div className="flex flex-wrap gap-3">
                                {formData.sizes.map(s => (
                                    <button
                                        key={s.size}
                                        type="button"
                                        onClick={() => handleSizeToggle(s.size)}
                                        className={`px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border
                                            ${s.available
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'}`}
                                    >
                                        {s.size}
                                        {s.available ? <CheckCircle2 size={10} className="inline ml-2" /> : <X size={10} className="inline ml-2" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Images */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Product Images</label>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {/* Existing Images */}
                                {formData.images.map((img, i) => (
                                    <div key={i} className="relative aspect-[4/5] bg-gray-50 border border-gray-100 group">
                                        <img src={img.url} className="w-full h-full object-cover" alt="Product" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(i)}
                                            className="absolute top-2 right-2 p-1.5 bg-white shadow-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        {img.isPrimary && <span className="absolute bottom-2 left-2 bg-black text-[8px] text-white px-2 py-0.5 uppercase tracking-widest font-bold">Primary</span>}
                                    </div>
                                ))}

                                {/* Selected for upload */}
                                {selectedFiles.map((file, i) => (
                                    <div key={`new-${i}`} className="relative aspect-[4/5] bg-gray-100 border border-dashed border-gray-300 group">
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                            <p className="text-[10px] text-center px-2 line-clamp-1">{file.name}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSelectedFile(i)}
                                            className="absolute top-2 right-2 p-1.5 bg-white shadow-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}

                                {/* Add Button */}
                                <label className="aspect-[4/5] border border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors group">
                                    <Upload className="text-gray-300 group-hover:text-black transition-colors mb-2" size={24} />
                                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 group-hover:text-black">Upload</span>
                                    <input type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" />
                                </label>
                            </div>

                            <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                * The first image in the list will be used as the primary display image.
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest">
                                {error}
                            </div>
                        )}

                        <div className="pt-10 flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 h-16 border border-gray-100 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-2 bg-black text-white h-16 px-10 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
