"use client";

import { useEffect, useMemo, useState } from 'react';
// 🌟 引入 framer-motion
import { motion, AnimatePresence } from 'framer-motion'; 
import Navbar from '@/app/ui/dashboard/Navbar';
import ProductCard from '@/app/ui/dashboard/Product/ProductCard';
import { fetchProducts } from '@/app/services/authService';
import ProductHeader from '@/app/ui/dashboard/Product/product-header';
import { categories } from '@/app/ui/dashboard/Product/CategoryFilter';

type Category = typeof categories[number];

type Product = {
    product_id: number;
    product_name: string;
    price: number;
    image_url: string;
    category: string;
};

// ==========================================
// 🌟 1. 定義動畫的 Variants (變體)
// ==========================================

// 外層 Grid 容器的動畫設定：用來控制子元素的串聯
const containerVariants = {
    hidden: { opacity: 1 }, // 初始狀態
    visible: {
        opacity: 1,
        transition: {
            // 這裡就是魔法所在！
            // 當子元素 (itemVariants) 顯示時，每張卡片交錯 0.1 秒登場
            staggerChildren: 0.1 
        }
    },
    // 當卡片消失時，不需要交錯，整批消失即可
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

// 單張卡片的動畫設定
const itemVariants = {
    // 剛登場時：在原本位置下方 20px，並且透明
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,       // 移回原位
        opacity: 1, // 變為不透明
        transition: {
            type: "spring", // 使用彈簧效果，更自然
            stiffness: 100,
            damping: 15
        }
    },
    // 被剔除時：在原位漸隱
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

// ==========================================

export default function Gallery() {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category>('全部商品');

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        loadProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (activeCategory === '全部商品') {
            return products;
        }

        return products.filter((product) => product.category === activeCategory);
    }, [products, activeCategory]);


    return (
        <main className="bg-retro-bg min-h-screen">
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
                <ProductHeader
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
                
                {/* 🌟 2. 修改外層 Grid 容器 */}
                {/* 這裡必須加上 key={activeCategory}。這非常關鍵！
                    每當分類改變，這會強迫整個 Grid 重新渲染，從而觸發完美的交錯登場動畫。 */}
                <motion.div 
                    key={activeCategory}
                    layout // 依然保留 layout，讓外層容器高度平滑過渡
                    className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    // 🌟 套用容器的 variants
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            // 🌟 3. 修改單張卡片的包覆層
                            <motion.div
                                key={product.product_id}
                                layout
                                // 🌟 套用子元素的 variants (會自動繼承外層的 hidden/visible 狀態)
                                variants={itemVariants}
                                // 當卡片需要自動滑動補位時的動畫設定
                                transition={{ layout: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 } }}
                            >
                                <ProductCard
                                    id={product.product_id}
                                    name={product.product_name} 
                                    price={product.price}
                                    image={product.image_url}
                                    category={product.category}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                </motion.div>
            </div>
        </main>
    );
}