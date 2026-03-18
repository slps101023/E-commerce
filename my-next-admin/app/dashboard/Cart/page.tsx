"use client"

import { useCartState } from '@/app/hooks/useCart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import Navbar from '@/app/ui/dashboard/Navbar';

export default function Cart() {
    const { items, updateQuantity, removeItem, clearCart } = useCartState();
    const router = useRouter();
    // UX: 管理勾選狀態
    const [selectedItems, setSelectedItems] = useState(items.map(i => i.id));

    // 計算總價
    const totalPrice = items
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const toggleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };
    // todo: 元件化購物車項目，
    if (items.length === 0) {
        return (
            <main className="bg-retro-bg min-h-screen">
                <Navbar />
                <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
                    <div className="rounded-full bg-retro-ink/5 p-10">
                        <ShoppingBag className="h-16 w-16 text-retro-ink/20" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black italic tracking-tighter text-retro-ink">您的購物車是空的</h2>
                        <p className="text-retro-slate opacity-70">好東西不等人，快去挑選心儀的商品吧！</p>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="rounded-full bg-retro-ink px-10 py-4 font-bold text-retro-bg transition-transform hover:scale-105 active:scale-95 shadow-xl"
                    >
                        開始購物
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-retro-bg min-h-screen">
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
                {/* 標題區 */}
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

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* 左側：商品清單 (佔 8 欄) */}
                    <div className="lg:col-span-8 space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`group relative flex gap-6 rounded-[32px] border border-retro-ink/5 bg-white/40 p-6 backdrop-blur-sm transition-all hover:bg-white/60 ${selectedItems.includes(item.id) ? 'ring-2 ring-retro-ink' : ''}`}
                            >
                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                        className="h-5 w-5 cursor-pointer accent-retro-ink"
                                    />
                                </div>

                                {/* 圖片區 */}
                                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-retro-bg">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                </div>

                                {/* 資訊區 */}
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between">
                                            <h4 className="text-xl font-bold tracking-tight text-retro-ink">{item.name}</h4>
                                            <p className="font-black italic text-retro-ink">${item.price.toLocaleString()}</p>
                                        </div>
                                        <p className="text-xs font-medium text-retro-slate/60 mt-1 uppercase tracking-widest">Model: Default Archive</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* 數量控制 */}
                                        <div className="flex items-center rounded-full border border-retro-ink/10 bg-retro-bg/50 p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="rounded-full p-2 hover:bg-white disabled:opacity-30"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="rounded-full p-2 hover:bg-white"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>

                                        {/* 操作按鈕 */}
                                        <div className="flex gap-4">
                                            <button className="text-retro-slate/40 hover:text-retro-ink transition-colors">
                                                <Heart className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-retro-slate/40 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 右側：結算看板 (佔 4 欄) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 rounded-[40px] border border-retro-ink bg-retro-ink p-8 text-retro-bg shadow-2xl">
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-8">Summary</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-medium opacity-70">
                                    <span>Subtotal ({selectedItems.length} items)</span>
                                    <span>${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium opacity-70">
                                    <span>Shipping</span>
                                    <span className="text-green-400 font-bold tracking-widest uppercase text-[10px]">Free</span>
                                </div>

                                <div className="my-8 h-[1px] w-full bg-retro-bg/20" />

                                <div className="flex items-end justify-between">
                                    <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-4xl font-black italic leading-none">${totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                disabled={selectedItems.length === 0}
                                className="mt-10 w-full rounded-2xl bg-retro-bg py-5 text-sm font-black uppercase tracking-[0.2em] text-retro-ink transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                            >
                                Checkout Now ({selectedItems.length})
                            </button>

                            <p className="mt-6 text-center text-[10px] font-medium opacity-40 uppercase tracking-widest">
                                Secure payment processed via Archive Pay
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};