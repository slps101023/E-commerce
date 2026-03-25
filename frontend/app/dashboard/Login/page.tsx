"use client";

import React from 'react';
import LoginBackgroup from '@/app/ui/dashboard/Form/login-form-backgroup';
import LoginForm from '@/app/ui/dashboard/Form/login-form';


export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-retro-bg overflow-x-hidden selection:bg-retro-ink selection:text-retro-bg">
            {/* 左側：品牌視覺區 */}
            <LoginBackgroup />
            {/* 右側：表單區 */}
            <LoginForm />
        </div>
    );
}

