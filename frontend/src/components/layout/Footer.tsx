"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Footer() {
    const [year, setYear] = useState(2025);
    useEffect(() => { setYear(new Date().getFullYear()); }, []);
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-[#1a1a1a]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Col */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-6">H T B</h3>
                        <p className="text-sm text-gray-400 mb-6 max-w-sm">
                            Minimal luxury editorial fashion aesthetic for the modern silhouette.
                        </p>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
                        </ul>
                    </div>

                    {/* Links Col 2 */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Col */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-sm text-gray-400 mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-b border-gray-600 px-0 py-2 text-sm w-full focus:outline-none focus:border-white transition-colors"
                                required
                                suppressHydrationWarning
                            />
                            <button type="submit" className="uppercase tracking-widest text-xs font-semibold ml-4 border-b border-white py-2 hover:text-gray-400 hover:border-gray-400 transition-colors" suppressHydrationWarning>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {year} House of Three Brothers. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Facebook</a>
                        <a href="#" className="hover:text-white transition-colors">Pinterest</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
