"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string; isPrimary: boolean }[];
    slug: string;
    mainCategory: string;
    subCategory: string;
    sizes: { size: string; stock: number; available: boolean }[];
}

export function ProductGrid({ mainCategory, subCategory }: { mainCategory: string | null, subCategory: string | null }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products`;
                const params = new URLSearchParams();
                if (mainCategory) params.set('mainCategory', mainCategory);
                if (subCategory) params.set('subCategory', subCategory);

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }

                const res = await fetch(url).catch(() => null);

                if (res && res.ok) {
                    const result = await res.json();
                    if (result.success) {
                        setProducts(result.data);
                        return;
                    } else {
                        setError(result.message || 'Failed to load products');
                    }
                } else {
                    setError('Backend API is unreachable. Please ensure the server is running.');
                }

                setProducts([]);
            } catch (error: any) {
                console.error('Error fetching products:', error);
                setError('Connection error: ' + (error.message || 'Check console'));
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [mainCategory, subCategory]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-100" />
                        <div className="h-4 bg-gray-100 w-2/3" />
                        <div className="h-4 bg-gray-100 w-1/3" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${mainCategory}-${subCategory}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    {error ? (
                        <div className="col-span-full py-20 text-center border border-dashed border-red-200 bg-red-50/30">
                            <p className="text-red-500 uppercase tracking-[0.2em] text-[10px] font-bold">{error}</p>
                            <p className="text-gray-400 text-[10px] mt-2 italic">Using http://localhost:5000/api/v1/products</p>
                        </div>
                    ) : products.length > 0 ? (
                        products.map((product) => {
                            const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url;
                            const hasImage = !!primaryImage;
                            const isOutOfStock = product.sizes?.every(s => s.stock <= 0 || !s.available);

                            return (
                                <Link key={product._id} href={`/products/${product.slug}`} className="group cursor-pointer block relative">
                                    <div className="premium-img-wrapper aspect-[4/5] overflow-hidden mb-6 bg-gray-50 relative group">
                                        {hasImage ? (
                                            <img
                                                src={primaryImage}
                                                alt={product.name}
                                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'opacity-60 grayscale-[0.5]' : ''}`}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-[#888]">
                                                <div className="w-8 h-[1px] bg-gray-300 mb-3" />
                                                <span className="text-[9px] uppercase tracking-[0.3em] font-medium">No Image Available</span>
                                            </div>
                                        )}
                                        {isOutOfStock && (
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-black shadow-sm">
                                                Out of Stock
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className={`text-[12px] font-bold uppercase tracking-[0.15em] text-[#111] line-clamp-1 ${isOutOfStock ? 'opacity-50' : ''}`}>
                                            {product.name}
                                        </h3>
                                        <p className={`text-[13px] font-medium text-gray-600 ${isOutOfStock ? 'opacity-50' : ''}`}>₹{product.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center border border-dashed border-gray-200">
                            <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold">No products found in this category.</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
