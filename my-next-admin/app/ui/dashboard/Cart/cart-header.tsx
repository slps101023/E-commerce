"use client";

import { useCartState } from '@/app/hooks/useCart';
import Navbar from '@/app/ui/dashboard/Navbar';


export default function CartHeader() {
    const { items, clearCart } = useCartState();

    return (
        <header className="mb-12 border-b border-retro-ink/10 pb-8 flex items-end justify-between">
            <div>
                <h2 className="text-5xl font-black italic tracking-tighter text-retro-ink uppercase">Your Bag</h2>
                <p className="mt-2 text-sm font-medium text-retro-slate">您挑選了 {items.length} 件檔案商品</p>
            </div>
            <button
                className="text-xs font-bold tracking-widest text-retro-slate/40 uppercase hover:text-red-500 transition-colors"
                onClick={() => clearCart()}
            >
                Clear All
            </button>
        </header>
    )
}