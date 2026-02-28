"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Search, User, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
    const { toggleCart, getSummary } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const { count } = getSummary();

    const navLinks = [
        { href: '/shop', label: 'Shop' },
        { href: '/collections', label: 'Collections' },
        { href: '/about', label: 'Our Story' },
        { href: '/account/login', label: 'Account' },
    ];

    return (
        <>
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">

                    {/* Left: Hamburger (mobile) + Nav Links (desktop) */}
                    <div className="flex items-center gap-6 md:w-1/3">
                        {/* Hamburger - mobile only */}
                        <button
                            className="md:hidden text-black focus:outline-none"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open Menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.slice(0, 3).map(link => (
                                <Link key={link.href} href={link.href} className="nav-link">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Center: Brand Logo */}
                    <div className="flex justify-center md:w-1/3">
                        <Link href="/" className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-[#111]">
                            H T B
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-6 md:w-1/3">
                        <button className="hidden md:block text-black hover:text-gray-600 transition-colors" suppressHydrationWarning>
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/account/login" className="hidden md:block text-black hover:text-gray-600 transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                        <button
                            className="text-black hover:text-gray-600 transition-colors relative flex items-center"
                            onClick={toggleCart}
                            aria-label="Open Cart"
                            suppressHydrationWarning
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {mounted && count > 0 && (
                                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {count}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </header>

            {/* Dark Overlay behind mobile menu */}
            <div
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Slide-in Menu Panel */}
            <div
                className={`fixed top-0 left-0 z-[60] h-full w-[80vw] max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between px-6 h-20 border-b border-[#EAEAEA]">
                    <span className="text-lg font-bold uppercase tracking-[0.2em] text-[#111]">Menu</span>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-black focus:outline-none"
                        aria-label="Close Menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col px-6 pt-6 gap-0 flex-grow">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#111] border-b border-[#F0F0F0] hover:pl-3 transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Brand Footer inside menu */}
                <div className="px-6 py-8 border-t border-[#EAEAEA]">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">House of Three Brothers</p>
                    <p className="text-[10px] text-gray-300 mt-1">Minimal Luxury Menswear</p>
                </div>
            </div>
        </>
    );
}
