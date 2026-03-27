import { create } from 'zustand';

// 定義購物車項目的類型
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

// 定義購物車狀態和操作的類型
interface CartState {
    items: CartItem[];
    addItem: (product: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void; // delta 是 +1 或 -1
    clearCart: () => void;
}

// 使用 Zustand 創建購物車狀態管理
const useCartState = create<CartState>((set) => ({
    items: [],

    // 加入購物車（進階邏輯：重複加入時只增加數量）
    addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);

        if (existingItem) {
            return {
                items: state.items.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
    }),

    removeItem: (id: string | number) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
    })),

    updateQuantity: (id: string | number, delta: number) => set((state) => ({
        items: state.items.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ),
    })),

    clearCart: () => set({ items: [] }),
}));



export { useCartState };