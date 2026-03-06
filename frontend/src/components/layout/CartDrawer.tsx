"use client"
import { useCartStore } from '@/store/cartStore';
import { X, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

export function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCartStore();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={() => setIsOpen(false)}
            />
            <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white z-50 flex flex-col shadow-2xl transition-transform transform translate-x-0">
                <div className="flex items-center justify-between p-6 border-b border-[#EAEAEA]">
                    <h2 className="text-lg font-bold tracking-widest uppercase">Shopping Cart</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                            <p className="text-gray-500 italic">Your cart is currently empty.</p>
                            <button onClick={() => setIsOpen(false)} className="btn-primary mt-4">Start Shopping</button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-[80px] h-[100px] bg-gray-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-[#888]">
                                                <div className="w-4 h-[1px] bg-gray-300 mb-1" />
                                                <span className="text-[7px] uppercase tracking-widest font-medium">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-sm uppercase">{item.name}</h3>
                                            <button onClick={() => removeItem(item.id)}><X className="w-4 h-4 text-gray-400 hover:text-black" /></button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div className="flex items-center border border-[#EAEAEA]">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="px-2 py-1 hover:bg-gray-50"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-2 text-sm select-none">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-50"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-[#EAEAEA] bg-white">
                        <div className="flex justify-between mb-6">
                            <span className="text-sm font-semibold uppercase">Subtotal</span>
                            <span className="text-sm font-semibold">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            className="btn-primary w-full"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
