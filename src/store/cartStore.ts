import { create } from 'zustand';

// 1. 定義單個商品的形狀
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // 選填，以後加圖片用
}

// 2. 定義購物車大腦的規格
interface CartState {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void; // delta 是 +1 或 -1
  clearCart: () => void;
}

// 3. 實作大腦邏輯
export const useCartState = create<CartState>((set) => ({
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

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ),
  })),

  clearCart: () => set({ items: [] }),
}));