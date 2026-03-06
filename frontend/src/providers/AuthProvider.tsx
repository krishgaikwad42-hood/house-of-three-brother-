'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/useCartStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { checkAuth, isInitializing, user } = useAuthStore();
    const { fetchFromBackend } = useCartStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isInitializing && user) {
            fetchFromBackend();
        }
    }, [isInitializing, user, fetchFromBackend]);

    // We can also return a loading skeleton here if isInitializing is true and we want global blocking,
    // but for an e-commerce site, non-authenticated users should see the site instantly.
    // Auth-protected routes will handle their own redirects if !isAuthenticated after isInitializing.

    return <>{children}</>;
}
