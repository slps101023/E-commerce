"use client"

import { useCartState } from '@/app/hooks/useCart';
import { useState, useEffect } from 'react';
import Navbar from '@/app/ui/dashboard/Navbar';
import EmptyCart from '@/app/ui/dashboard/Cart/empty-cart';
import CartHeader from '@/app/ui/dashboard/Cart/cart-header';
import CartProductList from '@/app/ui/dashboard/Cart/cart-product-list';
import CartSummary from '@/app/ui/dashboard/Cart/cart-summry';
import { useAuth } from '@/app/hooks/useAuth';
import Loading from '@/app/ui/dashboard/loading';
import CartUnAuthenticated from '@/app/ui/dashboard/Cart/cart-unAuthenticated';
import axios from 'axios';


export default function Cart() {
    const { items, updateQuantity, removeItem } = useCartState();
    const { isAuthenticated, isLoading } = useAuth();
    // UX: 管理勾選狀態
    const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
    // 計算總價
    const totalPrice = items
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const toggleSelect = (id: string | number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleUpdateQuantity = (id: string | number, delta: number) => {
        if (typeof id === 'number') {
            updateQuantity(id, delta);
        }
    };

    const handleRemoveItem = (id: string | number) => {
        if (typeof id === 'number') {
            removeItem(id);
        }
    };

    // 載入中的骨架屏
    if (isLoading) {
        return <Loading />;
    }

    // 元件化
    if (!isAuthenticated) {
        return <CartUnAuthenticated />;
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
                            updateQuantity={handleUpdateQuantity}
                            removeItem={handleRemoveItem}
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