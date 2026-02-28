"use client"
import Link from 'next/link';
import { useState } from 'react';

// Mock data for initial UI build
const mockProducts = [
    { id: '1', name: 'OVERSIZED LINEN SHIRT', price: 4999, image: '/api/placeholder/400/500', slug: 'oversized-linen-shirt' },
    { id: '2', name: 'TAILORED WOOL TROUSERS', price: 7999, image: '/api/placeholder/400/500', slug: 'tailored-wool-trousers' },
    { id: '3', name: 'CASHMERE BLEND SWEATER', price: 12999, image: '/api/placeholder/400/500', slug: 'cashmere-blend-sweater' },
    { id: '4', name: 'CLASSIC SILK SCARF', price: 2499, image: '/api/placeholder/400/500', slug: 'classic-silk-scarf' },
    { id: '5', name: 'TEXTURED COTTON BLAZER', price: 15999, image: '/api/placeholder/400/500', slug: 'textured-cotton-blazer' },
    { id: '6', name: 'MINIMALIST LEATHER BELT', price: 3499, image: '/api/placeholder/400/500', slug: 'minimalist-leather-belt' },
];

export function ProductGrid() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="fade-in-section">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {mockProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer block">
                        <div className="premium-img-wrapper aspect-[4/5] object-cover mb-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="premium-img"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#111] line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="text-[13px] font-medium text-gray-600">₹{product.price.toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load More Trigger Area (Intersection Observer stub) */}
            <div className="mt-16 flex justify-center">
                <button className="h-[56px] border border-[#EAEAEA] px-12 md:px-16 uppercase tracking-[0.2em] text-[11px] font-bold text-[#111] hover:border-[#111] hover:bg-black hover:text-white transition-all duration-300">
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </div>
    );
}
