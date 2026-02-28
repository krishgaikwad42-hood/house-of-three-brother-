"use client";

import { useCartStore } from '@/store/useCartStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CartDrawer() {
    const { items, isOpen, setIsOpen, updateQuantity, removeItem, getSummary } = useCartStore();
    const { subtotal } = getSummary();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#EAEAEA]">
                    <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Cart ({items.length})
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <ShoppingBag className="w-12 h-12 text-gray-300" />
                            <p className="text-gray-500 text-sm uppercase tracking-widest">Your cart is empty</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-[56px] border border-[#EAEAEA] px-12 uppercase tracking-[0.2em] text-[11px] font-bold text-[#111] hover:border-[#111] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center mt-4 w-full max-w-[240px]"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-24 h-32 flex-shrink-0 bg-gray-100 border border-[#EAEAEA]">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-xs font-semibold uppercase tracking-widest line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-black transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Size: {item.size}</p>
                                        <p className="text-sm font-medium mt-2">₹{item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center border border-[#EAEAEA] w-max">
                                        <button
                                            className="p-2 hover:bg-gray-50 transition-colors"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                        <button
                                            className="p-2 hover:bg-gray-50 transition-colors"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-[#EAEAEA] p-6 bg-white shrink-0">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 uppercase tracking-widest">Subtotal</span>
                                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                        </div>

                        <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            className="btn-primary w-full flex justify-center h-14"
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
