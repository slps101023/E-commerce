'use client';

import { useAuth } from '@/app/hooks/useAuth'; // 沿用你的路徑
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import axios from 'axios';
import { useCartState } from '@/app/hooks/useCart'; // 如果你需要在這裡使用購物車狀態，可以引入它

export default function NavLinks() {
    const pathname = usePathname();
    const router = useRouter();
    // 1. 從 useAuth 取得狀態與重新檢查的 function
    const { isAuthenticated, isLoading, checkSession } = useAuth();
    const { items: cartItems } = useCartState(); // 如果你想在這裡顯示購物車數量，可以使用這個狀態

    // 2. 定義共用連結 (不管登入與否都看得到)
    const baseLinks = [
        { name: 'Products', href: '/dashboard/Product' },
        { name: 'Cart', href: '/dashboard/Cart' },
    ];

    // 3. 根據登入狀態，動態決定要顯示哪些連結
    const linksToDisplay = isAuthenticated
        ? [...baseLinks, { name: 'Profile', href: '/dashboard/Profile' }]
        : [...baseLinks, { name: 'Login', href: '/dashboard/Login' }];

    // 4. 實作登出邏輯
    const handleLogout = async () => {
        try {
            // 呼叫後端的登出 API (用來清空 HttpOnly Cookie)
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, { cartItems }, { 
                withCredentials: true 
            });
            
            // 重新檢查狀態 (這會讓 isAuthenticated 瞬間變成 false，畫面自動切換)
            await checkSession();
            
            // 導向登入頁或首頁
            router.push('/');
        } catch (error) {
            console.error("登出失敗", error);
        }
    };

    // 🌟 防閃爍機制：如果還在檢查身分，先不要渲染專屬按鈕，避免畫面跳動
    if (isLoading) {
        return <div className="text-retro-slate text-sm font-bold px-4 py-2">載入選單中...</div>;
    }

    return (
        <>
            {/* 渲染正常的 Links (Products, Cart, Profile 或 Login) */}
            {linksToDisplay.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center',
                            'text-retro-slate hover:text-retro-ink hover:bg-white/50',
                            {
                                'bg-retro-ink text-retro-bg shadow-md': isActive,
                            }
                        )}
                    >
                        <p className="">{link.name}</p>
                    </Link>
                );
            })}

            {/* 渲染 Logout 按鈕 (只有登入時才顯示) */}
            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className={clsx(
                        'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 text-left flex items-center',
                        'text-retro-slate hover:text-retro-ink hover:bg-white/50',
                        // 如果你希望登出按鈕有特殊顏色（例如紅色），可以加在這裡
                    )}
                >
                    <p className="">Logout</p>
                </button>
            )}
        </>
    );
}