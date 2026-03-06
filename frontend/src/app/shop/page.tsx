"use client"
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { FilterSidebar } from '@/components/products/FilterSidebar';

function ShopContent() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const mainCategory = searchParams.get('mainCategory');
    const subCategory = searchParams.get('subCategory');
    const category = subCategory || mainCategory || 'All Products';

    if (!mounted) return null;

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
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
                    <button className="border border-[#EAEAEA] h-12 px-6 uppercase tracking-widest text-xs flex items-center bg-white">
                        Filter
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
