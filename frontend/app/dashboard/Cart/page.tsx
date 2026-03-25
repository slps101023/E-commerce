"use client"

import { useCartState } from '@/app/hooks/useCart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/ui/dashboard/Navbar';
import EmptyCart from '@/app/ui/dashboard/Cart/empty-cart';
import CartHeader from '@/app/ui/dashboard/Cart/cart-header';
import CartProductList from '@/app/ui/dashboard/Cart/cart-product-list';
import CartSummary from '@/app/ui/dashboard/Cart/cart-summry';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';


export default function Cart() {
    const { items, updateQuantity, removeItem } = useCartState();
    const { isAuthenticated, isLoading } = useAuth();
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

    // 1. 載入中的骨架屏 (避免閃爍)
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
                <div className="w-24 h-24 bg-retro-ink/10 rounded-full mb-6"></div>
                <div className="h-6 w-48 bg-retro-ink/10 rounded mb-4"></div>
                <div className="h-4 w-64 bg-retro-ink/10 rounded"></div>
            </div>
        );
    }
    // 元件化
    if (!isAuthenticated) {
        return (
            <main>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">

                    <div className="w-32 h-32 mb-8 text-retro-slate opacity-50">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl font-black text-retro-ink mb-4 tracking-wide">
                        PLEASE LOG IN FIRST
                    </h1>

                    <p className="text-retro-slate mb-8 max-w-md">
                        登入後即可查看您的購物車。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
                        <Link
                            href="/dashboard/Login"
                            className="px-8 py-3 bg-retro-ink text-retro-bg font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg text-center"
                        >
                            Log In
                        </Link>

                        <Link
                            href="/dashboard/Register"
                            className="px-8 py-3 bg-transparent border-2 border-retro-ink text-retro-ink font-bold rounded-full hover:bg-retro-ink/5 transition-colors duration-300 text-center"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </main>
        );
    } else {
        // 空購物車狀態
        if (items.length === 0) {
            return <EmptyCart />;
        }

        // 正常購物車狀態
        return (
            <main className="bg-retro-bg min-h-screen">
                <Navbar />
                <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
                    <CartHeader />
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* 左側：商品清單 (佔 8 欄) */}
                        <CartProductList
                            items={items}
                            selectedItems={selectedItems}
                            toggleSelect={toggleSelect}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                        />
                        {/* 右側：結算看板 (佔 4 欄) */}
                        <CartSummary
                            selectedItems={selectedItems}
                            totalPrice={totalPrice}
                        />
                    </div>
                </div>
            </main>
        );
    }
};