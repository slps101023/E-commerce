'use client';

import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/ui//dashboard/Navbar';

// todo: 元件化：將帳號資訊區塊抽成獨立元件 <UserCard />，並且可以重複使用在其他頁面（例如訂單頁面）
export default function ProfilePage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // 1. 載入中狀態 (骨架屏)
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
                <div className="w-24 h-24 bg-retro-ink/10 rounded-full mb-6"></div>
                <div className="h-6 w-48 bg-retro-ink/10 rounded mb-4"></div>
                <div className="h-4 w-64 bg-retro-ink/10 rounded"></div>
            </div>
        );
    }

    // 2. 🔴 未登入防護：如果未登入直接硬闖網址，顯示引導畫面
    if (!isAuthenticated) {
        router.push('/');
        return null;
    }

    return (
        <main>
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 px-4 min-h-[75vh]">
                {/* 頁面標題 */}
                <h1 className="text-3xl font-black text-retro-ink mb-10 border-b-2 border-retro-ink/10 pb-4 tracking-wider">
                    MY PROFILE
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* 左側：使用者名片 */}
                    <div className="md:col-span-1">
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-retro-ink/10 shadow-sm flex flex-col items-center text-center relative overflow-hidden">

                            {/* 裝飾背景 */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-retro-ink/5 rounded-full blur-2xl pointer-events-none"></div>

                            {/* 大頭貼 (取帳號第一個字) */}
                            <div className="w-24 h-24 bg-retro-ink text-retro-bg rounded-full flex items-center justify-center text-4xl font-black mb-6 shadow-inner">
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>

                            <h2 className="text-xl font-bold text-retro-ink mb-1">
                                {user?.username || 'User'}
                            </h2>
                            <p className="text-retro-slate text-sm mb-6">
                                ID: #{user?.id?.toString().slice(0, 8) || '0000'}
                            </p>

                            <button className="w-full py-2.5 bg-transparent border-2 border-retro-ink text-retro-ink font-bold rounded-full hover:bg-retro-ink hover:text-retro-bg transition-colors text-sm">
                                編輯個人資料
                            </button>
                        </div>
                    </div>

                    {/* 右側：詳細資訊與功能區塊 */}
                    <div className="md:col-span-2 flex flex-col gap-6">

                        {/* 區塊 1：帳號資訊 */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-retro-ink/10 shadow-sm">
                            <h3 className="text-lg font-bold text-retro-ink mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-retro-slate" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path></svg>
                                帳號詳細資訊
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between border-b border-retro-ink/5 pb-2">
                                    <span className="text-retro-slate">使用者名稱</span>
                                    <span className="font-medium text-retro-ink">{user?.username}</span>
                                </div>
                                <div className="flex justify-between border-b border-retro-ink/5 pb-2">
                                    <span className="text-retro-slate">電子郵件</span>
                                    <span className="font-medium text-retro-ink">尚無資料</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-retro-slate">密碼</span>
                                    <span className="font-medium text-retro-ink">********</span>
                                </div>
                            </div>
                        </div>

                        {/* 區塊 2：最近訂單 (預留欄位) */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-retro-ink/10 shadow-sm">
                            <h3 className="text-lg font-bold text-retro-ink mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-retro-slate" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg>
                                最近訂單
                            </h3>
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <p className="text-retro-slate text-sm mb-4">您目前還沒有任何訂單紀錄喔！</p>
                                <Link
                                    href="/dashboard/Product"
                                    className="px-6 py-2 bg-retro-ink text-retro-bg font-bold rounded-full hover:bg-retro-ink/90 transition-colors text-sm"
                                >
                                    去逛逛商品
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}