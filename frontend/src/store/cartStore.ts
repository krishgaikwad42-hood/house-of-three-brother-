import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // product id + size
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    get subtotal(): number;
    get totalItems(): number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === newItem.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
                            ),
                            isOpen: true,
                        };
                    }
                    return { items: [...state.items, newItem], isOpen: true };
                });
            },
            removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
                })),
            clearCart: () => set({ items: [] }),
            setIsOpen: (isOpen) => set({ isOpen }),
            get subtotal() {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            get totalItems() {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'house-of-three-brothers-cart',
        }
    )
);
