"use client"
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { FilterSidebar } from '@/components/products/FilterSidebar';

const MOBILE_CATEGORIES = [
    { label: 'All', main: null },
    { label: 'Shirts', main: 'SHIRTS' },
    { label: 'T-Shirts', main: 'T-SHIRTS' },
    { label: 'Polos', main: 'POLOS' },
    { label: 'Jeans', main: 'JEANS' },
];

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

            {/* Page heading */}
            <div className="mb-8 border-b border-[#EAEAEA] pb-6">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-5">
                    <h1 className="text-[2rem] md:text-5xl font-normal uppercase tracking-[0.1em]">
                        {category}
                    </h1>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mt-2 md:mt-0">Products</p>
                </div>

                {/* Mobile-only: horizontal scrollable category pills */}
                <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 pb-1 w-max">
                        {MOBILE_CATEGORIES.map(({ label, main }) => {
                            const isActive = main === null ? !mainCategory : mainCategory === main;
                            return (
                                <a
                                    key={label}
                                    href={main ? `/shop?mainCategory=${encodeURIComponent(main)}` : '/shop'}
                                    className={`flex-shrink-0 h-9 px-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap border flex items-center justify-center ${isActive
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-black border-[#DCDCDC] hover:border-black'
                                        }`}
                                >
                                    {label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Desktop Sidebar */}
                <div className="w-full md:w-[240px] flex-shrink-0 hidden md:block">
                    <FilterSidebar />
                </div>

                {/* Product Grid */}
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
