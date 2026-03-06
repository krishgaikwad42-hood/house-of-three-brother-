"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CategoryStructure {
    name: string;
    subcategories?: string[];
}

const CATEGORIES: CategoryStructure[] = [
    {
        name: 'SHIRTS',
        subcategories: ['Half Shirts', 'Full Sleeve Shirts']
    },
    {
        name: 'T-SHIRTS',
        subcategories: ['Regular', 'Oversize', 'Full Sleeve']
    },
    {
        name: 'POLOS',
        subcategories: [] // Standalone
    },
    {
        name: 'JEANS',
        subcategories: ['Straight Fit', 'Baggy', 'Bootcut', 'Korean Pants']
    }
];

interface FilterSidebarProps {
    onSelect?: () => void;
}

export function FilterSidebar({ onSelect }: FilterSidebarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const currentMainCategory = searchParams.get('mainCategory');
    const currentSubCategory = searchParams.get('subCategory');

    useEffect(() => {
        setMounted(true);
        // Automatically expand the category if one is selected
        if (currentMainCategory) {
            setExpandedCategories([currentMainCategory]);
        } else if (currentSubCategory) {
            const parent = CATEGORIES.find(cat => cat.subcategories?.includes(currentSubCategory));
            if (parent) setExpandedCategories([parent.name]);
        }
    }, [currentMainCategory, currentSubCategory]);

    const toggleExpand = (name: string) => {
        setExpandedCategories(prev =>
            prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
        );
    };

    const handleCategoryClick = (main: string, sub?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Reset both before setting new ones
        params.delete('mainCategory');
        params.delete('subCategory');
        params.delete('category'); // Cleanup old Param if any

        if (main === 'ALL') {
            // Already deleted both
        } else if (sub) {
            params.set('mainCategory', main);
            params.set('subCategory', sub);
        } else {
            params.set('mainCategory', main);
            params.delete('subCategory');
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        if (onSelect) onSelect();
    };

    if (!mounted) {
        return <div className="animate-pulse space-y-10">
            <div className="h-4 bg-gray-100 w-1/2 mb-4" />
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-gray-100 w-full" />)}
            </div>
        </div>;
    }

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Categories</h3>
                <ul className="space-y-1">
                    <li>
                        <button
                            onClick={() => handleCategoryClick('ALL')}
                            className={`flex items-center w-full py-2 text-sm transition-all duration-300 ${!currentMainCategory && !currentSubCategory ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
                        >
                            <span className="uppercase tracking-widest text-[13px]">All Products</span>
                        </button>
                    </li>

                    {CATEGORIES.map((cat) => (
                        <li key={cat.name} className="border-b border-gray-50 last:border-0 py-2">
                            <div className="flex items-center justify-between group">
                                <button
                                    onClick={() => handleCategoryClick(cat.name)}
                                    className={`flex-1 text-left py-2 text-sm transition-all duration-300 ${currentMainCategory === cat.name ? 'text-black font-bold' : 'text-gray-500 hover:text-black hover:font-semibold'}`}
                                >
                                    <span className={`uppercase tracking-widest text-[13px] ${currentMainCategory === cat.name ? 'font-black' : 'font-bold'}`}>{cat.name}</span>
                                </button>
                                {cat.subcategories && cat.subcategories.length > 0 && (
                                    <button
                                        onClick={() => toggleExpand(cat.name)}
                                        className="p-2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        <motion.div
                                            animate={{ rotate: expandedCategories.includes(cat.name) ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={14} />
                                        </motion.div>
                                    </button>
                                )}
                            </div>

                            <AnimatePresence>
                                {expandedCategories.includes(cat.name) && cat.subcategories && cat.subcategories.length > 0 && (
                                    <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden pl-6 space-y-1 mt-1 mb-2 border-l border-gray-100 ml-1"
                                    >
                                        {cat.subcategories.map(sub => (
                                            <li key={sub}>
                                                <button
                                                    onClick={() => handleCategoryClick(cat.name, sub)}
                                                    className={`w-full text-left py-1.5 text-[11px] uppercase tracking-wider transition-colors duration-300 ${currentSubCategory === sub ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}`}
                                                >
                                                    {sub}
                                                </button>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button key={size} className="h-10 border border-gray-100 text-[10px] hover:border-black transition-all rounded-none uppercase tracking-widest">
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Availability</h3>
                <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input type="checkbox" className="peer h-4 w-4 opacity-0 absolute cursor-pointer" />
                        <div className="h-4 w-4 border border-gray-200 peer-checked:bg-black peer-checked:border-black transition-all" />
                    </div>
                    <span className="text-[12px] uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">In Stock Only</span>
                </label>
            </div>
        </div>
    );
}
