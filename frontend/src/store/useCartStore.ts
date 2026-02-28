import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // combination of productId and size e.g., '123-M'
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    getSummary: () => { subtotal: number; count: number };
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(i => i.id === newItem.id);
                    if (existingItemIndex >= 0) {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += newItem.quantity;
                        return { items: updatedItems, isOpen: true }; // Auto open on add
                    }
                    return { items: [...state.items, newItem], isOpen: true };
                });
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter(i => i.id !== id)
                }));
            },

            updateQuantity: (id, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
                }));
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            setIsOpen: (isOpen) => set({ isOpen }),

            getSummary: () => {
                const { items } = get();
                const count = items.reduce((acc, item) => acc + item.quantity, 0);
                const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                return { count, subtotal };
            }
        }),
        {
            name: 'house_of_three_cart',
        }
    )
);
