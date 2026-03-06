"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SearchBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                    const res = await fetch(`${apiUrl}/api/v1/products/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    if (data.success) {
                        setResults(data.data);
                    }
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in slide-in-from-top duration-300">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between border-b border-[#EAEAEA]">
                <div className="flex items-center flex-1 max-w-2xl">
                    <Search className="w-5 h-5 text-gray-400 mr-4" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for items, categories..."
                        className="w-full h-12 outline-none text-lg font-light tracking-wide uppercase placeholder:text-gray-300"
                    />
                    {loading && <Loader2 className="w-5 h-5 animate-spin text-gray-400 ml-2" />}
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 transition-colors uppercase text-[10px] font-bold tracking-widest flex items-center gap-2"
                >
                    Close <X className="w-5 h-5" />
                </button>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 overflow-y-auto max-h-[calc(100vh-80px)]">
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {results.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/products/${product.slug}`}
                                onClick={onClose}
                                className="group"
                            >
                                <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-4 relative">
                                    <img
                                        src={product.images[0]?.url}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-1">{product.name}</h3>
                                <p className="text-[11px] text-gray-500 uppercase tracking-widest">₹{product.price.toLocaleString()}</p>
                            </Link>
                        ))}
                    </div>
                ) : query.trim().length > 1 && !loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 uppercase tracking-widest text-[11px]">No products found for "{query}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Popular Categories</h4>
                            <div className="flex flex-col gap-4">
                                {['Oversized Shirts', 'Luxury Basics', 'Premium Linen', 'Trousers'].map(cat => (
                                    <Link key={cat} href={`/shop?search=${cat}`} onClick={onClose} className="text-[12px] uppercase tracking-widest hover:pl-2 transition-all">
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
