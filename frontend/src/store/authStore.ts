import { create } from 'zustand';

interface User {
    id: string;
    name?: string;
    email?: string;
    mobile?: string;
    role: 'customer' | 'admin';
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isInitializing: boolean;
    setAuth: (user: User) => void;
    clearAuth: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isInitializing: true,

    setAuth: (user) => set({ user, isAuthenticated: true }),

    clearAuth: () => set({ user: null, isAuthenticated: false }),

    checkAuth: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/auth/me`, {
                credentials: 'include' // Important for passing httpOnly cookie
            });
            const data = await response.json();
            if (data.success && data.data) {
                set({ user: data.data, isAuthenticated: true, isInitializing: false });
            } else {
                set({ user: null, isAuthenticated: false, isInitializing: false });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false, isInitializing: false });
        }
    }
}));
