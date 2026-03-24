"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// 1. 定義型別 (根據你後端回傳的資料格式調整)
interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkSession: () => Promise<void>;
}

// 2. 建立 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. 建立 Provider (用來包住整個 App 的外殼)
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 驗證身分的核心邏輯
    const checkSession = async () => {
        try {
            // 🌟 關鍵：帶著瀏覽器裡的 Cookie 去問後端
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
                withCredentials: true 
            });
            
            // 如果成功，把後端回傳的使用者資料存起來
            // (請確認 response.data 裡面的結構，可能是 response.data.user 或直接是 response.data)
            setUser(response.data.user || response.data); 
        } catch (error) {
            // 如果失敗 (例如 401 未授權)，代表沒登入或 Token 過期
            setUser(null);
            console.log("未登入或憑證已過期");
        } finally {
            // 不管成功或失敗，都把 loading 關掉，讓畫面開始渲染
            setIsLoading(false);
        }
    };

    // 網頁一刷新 (元件掛載時)，就自動執行一次
    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. 匯出 Custom Hook 供其他元件使用
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth 必須在 AuthProvider 內部使用");
    }
    return context;
}