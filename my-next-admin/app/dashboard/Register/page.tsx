"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-retro-bg overflow-x-hidden selection:bg-retro-ink selection:text-retro-bg">

            {/* 左側：品牌視覺區 (與 Login 同步，細節強化) */}
            <div className="hidden md:flex md:w-5/12 bg-retro-ink p-12 lg:p-16 flex-col justify-between text-retro-bg relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        {/* 這裡改成更細緻的菱形符號 */}
                        <div className="w-1.5 h-1.5 border border-retro-bg rotate-45 opacity-80" />
                        <span className="text-[9px] font-black tracking-[0.6em] uppercase opacity-40">
                            Archive Membership
                        </span>
                    </div>
                    <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85]">
                        JOIN THE <br />
                        <span className="opacity-20 italic">ARCHIVE</span>
                    </h1>
                </div>

                <div className="relative z-10 space-y-10">
                    <p className="max-w-xs text-[13px] font-medium leading-relaxed opacity-60 tracking-tight italic">
                        "Access your curated selection of daily pieces and historical archives. Designed for the modern collector."
                    </p>

                    <div className="flex gap-16 text-[9px] font-black tracking-[0.4em] uppercase opacity-30">
                        <div className="space-y-1">
                            <p className="opacity-50">Version</p>
                            <p className="text-retro-bg opacity-100 italic">2026.01</p>
                        </div>
                        <div className="space-y-1">
                            <p className="opacity-50">Access</p>
                            <p className="text-retro-bg opacity-100 italic">Verified</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 右側：表單區 (細節精修) */}
            <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 relative bg-retro-bg">

                {/* 返回商店：加上 Hover 線條動畫 */}
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-10 left-8 md:left-12 lg:left-24 text-[10px] font-black tracking-[0.4em] text-retro-ink/40 uppercase group transition-all"
                >
                    <span className="group-hover:mr-2 transition-all">←</span> Back to Store
                </button>

                <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto space-y-12 py-12">
                    
                    {/* Header */}
                    <div className="space-y-3">
                        <h2 className="text-6xl font-black italic tracking-tighter text-retro-ink uppercase leading-none">
                            Register
                        </h2>
                        <div className="h-0.5 w-12 bg-retro-ink/10" /> {/* 加入一個裝飾短線 */}
                        <p className="text-[11px] font-bold text-retro-slate/50 tracking-[0.1em] uppercase">
                            請輸入您的詳細資訊以建立帳號
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-10"> {/* 間距微調大一點，更有呼吸感 */}
                        
                        {/* Username */}
                        <div className="group space-y-1">
                            <label className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="TYPE YOUR NAME"
                                className="w-full bg-transparent border-b border-retro-ink/10 py-3 text-retro-ink font-bold placeholder:text-retro-ink/10 focus:border-retro-ink outline-none transition-all placeholder:text-[10px] placeholder:tracking-[0.2em]"
                            />
                        </div>

                        {/* Email */}
                        <div className="group space-y-1">
                            <label className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="EXAMPLE@MAIL.COM"
                                className="w-full bg-transparent border-b border-retro-ink/10 py-3 text-retro-ink font-bold placeholder:text-retro-ink/10 focus:border-retro-ink outline-none transition-all placeholder:text-[10px] placeholder:tracking-[0.2em]"
                            />
                        </div>

                        {/* Password */}
                        <div className="group space-y-1">
                            <label className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-transparent border-b border-retro-ink/10 py-3 text-retro-ink font-bold placeholder:text-retro-ink/10 focus:border-retro-ink outline-none transition-all placeholder:tracking-[0.5em]"
                            />
                        </div>

                        {/* 註冊按鈕：強化陰影與圓角質感 */}
                        <div className="pt-6">
                            <button
                                type="button"
                                className="w-full bg-retro-ink text-retro-bg py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(26,47,56,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(26,47,56,0.3)] hover:scale-[1.01] active:scale-[0.98]"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* 切換回登入 */}
                        <div className="text-center pt-2">
                            <p className="text-[10px] font-bold text-retro-slate/40 tracking-widest uppercase">
                                Already have an account? {' '}
                                <button
                                    type="button"
                                    onClick={() => router.push('/dashboard/Login')}
                                    className="text-retro-ink underline underline-offset-8 decoration-retro-ink/20 hover:decoration-retro-ink transition-all"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 底部 Footer：仿照 Login 絕對定位 */}
                <div className="absolute bottom-10 left-8 md:left-12 lg:left-24 right-8 md:right-12 lg:right-24 hidden md:flex justify-between items-center text-[8px] font-black text-retro-ink/20 tracking-[0.4em] uppercase">
                    <div className="flex items-center gap-4">
                        <span>© 2026 Archive Ltd.</span>
                        <div className="w-1 h-1 bg-retro-ink/10 rounded-full" />
                        <span>All Rights Reserved</span>
                    </div>
                    <div className="flex gap-6">
                        <span className="cursor-pointer hover:text-retro-ink transition-colors">Privacy</span>
                        <span className="cursor-pointer hover:text-retro-ink transition-colors">Terms</span>
                    </div>
                </div>

            </div>
        </div>
    );
}