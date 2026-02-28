import Link from 'next/link';
import { X } from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-[18px] left-4 md:hidden p-2 text-black hover:opacity-70 focus:outline-none"
            >
                <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center space-y-8">
                <Link href="/shop" onClick={() => setIsOpen(false)} className="text-[32px] font-normal uppercase tracking-widest text-black hover:opacity-70 transition-opacity">Shop</Link>
                <Link href="/collections" onClick={() => setIsOpen(false)} className="text-[32px] font-normal uppercase tracking-widest text-black hover:opacity-70 transition-opacity">Collections</Link>
                <Link href="/new-arrivals" onClick={() => setIsOpen(false)} className="text-[32px] font-normal uppercase tracking-widest text-black hover:opacity-70 transition-opacity">New Arrivals</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-[32px] font-normal uppercase tracking-widest text-black hover:opacity-70 transition-opacity">About</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-[32px] font-normal uppercase tracking-widest text-black hover:opacity-70 transition-opacity">Contact</Link>
            </nav>
        </div>
    );
}
