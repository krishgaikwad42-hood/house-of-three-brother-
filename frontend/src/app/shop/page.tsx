"use client"
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { FilterSidebar } from '@/components/products/FilterSidebar';
import { motion, AnimatePresence } from 'framer-motion';

function ShopContent() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const mainCategory = searchParams.get('mainCategory');
    const subCategory = searchParams.get('subCategory');
    const category = subCategory || mainCategory || 'All Products';

    if (!mounted) return null;

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            {/* Mobile Filter Drawer Overlay */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/40 z-[100] md:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[101] md:hidden p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Filters</h2>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <FilterSidebar onSelect={() => setShowMobileFilters(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-[#EAEAEA] pb-6">
                <h1 className="text-[2rem] md:text-5xl font-normal uppercase tracking-[0.1em]">
                    {category}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-widest mt-4 md:mt-0">Products</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <div className="w-full md:w-[240px] flex-shrink-0 hidden md:block">
                    <FilterSidebar />
                </div>

                {/* Mobile Filter Button */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="border border-[#EAEAEA] h-12 px-6 uppercase tracking-widest text-xs flex items-center bg-white hover:border-black transition-colors"
                    >
                        Filter
                        <span className="ml-3 text-[10px]">＋</span>
                    </button>
                    <select className="border border-[#EAEAEA] bg-white h-12 px-4 text-xs uppercase tracking-widest focus:outline-none rounded-none">
                        <option>Newest</option>
                        <option>Price: Low-High</option>
                        <option>Price: High-Low</option>
                    </select>
                </div>

                {/* Product Grid Area */}
                <div className="flex-1">
                    <div className="hidden md:flex justify-end mb-8">
                        <select className="border border-[#EAEAEA] bg-white h-12 px-6 text-xs uppercase tracking-widest focus:outline-none focus:border-black rounded-none">
                            <option>Sort: Newest First</option>
                            <option>Sort: Price Low to High</option>
                            <option>Sort: Price High to Low</option>
                        </select>
                    </div>
                    <ProductGrid mainCategory={mainCategory} subCategory={subCategory} />
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}
