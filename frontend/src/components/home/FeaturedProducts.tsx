"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { localProducts } from '@/utils/localData';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string; isPrimary: boolean }[];
    slug: string;
}

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products?limit=4`;
                const res = await fetch(url).catch(() => null);

                if (res && res.ok) {
                    const result = await res.json();
                    if (result.success) {
                        setProducts(result.data);
                        return;
                    }
                }

                // Fallback
                console.warn('Featured API unreachable, using local fallback');
                setProducts(localProducts.slice(0, 4) as any);
                if (!res) setError('Offline Mode');
            } catch (error: any) {
                console.error('Error fetching featured products:', error);
                setProducts(localProducts.slice(0, 4) as any);
                setError('Offline Mode');
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <section className="section-padding px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
                <div className="h-8 bg-gray-100 w-48 mx-auto mb-20 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-[4/5] bg-gray-50 animate-pulse" />
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section-padding px-4 text-center">
                <p className="text-red-500 uppercase tracking-widest text-xs font-bold">{error}</p>
                <p className="text-gray-400 text-[10px] mt-2 italic">Home page products fallback</p>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="section-padding px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] text-center mb-20 text-[#111]">
                New Arrivals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((product) => {
                    const primaryImage = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url;
                    const hasImage = !!primaryImage;

                    return (
                        <Link key={product._id} href={`/products/${product.slug}`} className="group cursor-pointer block">
                            <div className="premium-img-wrapper aspect-[4/5] overflow-hidden mb-6 bg-gray-50 relative">
                                {hasImage ? (
                                    <img
                                        src={primaryImage}
                                        alt={product.name}
                                        loading="lazy"
                                        className="premium-img"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-[#888]">
                                        <div className="w-8 h-[1px] bg-gray-300 mb-3" />
                                        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                                    <span className="bg-white text-black text-[11px] font-bold px-8 py-4 uppercase tracking-[2px] shadow-sm">
                                        Quick View
                                    </span>
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#111] line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-[13px] font-medium text-gray-600">₹{product.price.toLocaleString()}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-20 flex justify-center">
                <Link
                    href="/shop"
                    className="text-[13px] font-bold uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-black transition-all pb-1 inline-flex items-center group text-[#111]"
                >
                    View Complete Collection <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </section>
    );
}
