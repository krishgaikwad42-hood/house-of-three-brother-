"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingCart, Users,
    LogOut, Store, Menu, X
} from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/customers', label: 'Customers', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, clearAuth } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const handleLogout = async () => {
        try {
            await fetch(`${apiUrl}/api/v1/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch { }
        clearAuth();
        router.push('/admin/login');
    };

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    const SidebarContent = () => (
        <>
            <div className="h-20 flex items-center px-6 border-b border-[#EAEAEA]">
                <Link href="/admin" className="text-xl font-bold uppercase tracking-[0.2em]" onClick={() => setSidebarOpen(false)}>
                    H T B <span className="text-xs text-gray-400 font-normal ml-2">ADMIN</span>
                </Link>
            </div>

            <nav className="p-4 space-y-1 flex-1">
                {navItems.map(({ href, label, icon: Icon, exact }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors rounded ${isActive(href, exact)
                                ? 'bg-black text-white font-semibold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-[#EAEAEA] space-y-1">
                <Link href="/" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-500 hover:text-black transition-colors rounded hover:bg-gray-50">
                    <Store className="w-4 h-4" />
                    <span>View Store</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors rounded"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-[#EAEAEA] flex-shrink-0 hidden md:flex flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Mobile Sidebar Panel */}
            <div className={`fixed top-0 left-0 z-[60] h-full w-64 bg-white shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-4 right-4">
                    <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-black">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Admin Header */}
                <header className="h-20 bg-white border-b border-[#EAEAEA] flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
                    <button
                        className="md:hidden text-gray-500 hover:text-black"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-black">{user?.name || user?.email || 'Admin'}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Administrator</p>
                        </div>
                        <div className="w-9 h-9 bg-black text-white flex items-center justify-center text-sm font-bold uppercase">
                            {(user?.name || user?.email || 'A')[0]}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                <main className="p-6 md:p-8 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
