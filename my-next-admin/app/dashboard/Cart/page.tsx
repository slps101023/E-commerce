"use client"

import { useCartState } from '@/app/hooks/useCart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import Navbar from '@/app/ui/dashboard/Navbar';
import EmptyCart from '@/app/ui/dashboard/Cart/empty-cart';
import CartHeader from '@/app/ui/dashboard/Cart/cart-header';
import CartProductList from '@/app/ui/dashboard/Cart/cart-product-list';
import CartSummary from '@/app/ui/dashboard/Cart/cart-summry';

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
    // todo: 元件化購物車項目

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
};