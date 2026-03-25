"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import RegisterBackgroup from '@/app/ui/dashboard/Form/register-form-backgroup';
import RegisterForm from '@/app/ui/dashboard/Form/register-form';

export default function RegisterPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-retro-bg overflow-x-hidden selection:bg-retro-ink selection:text-retro-bg">
            {/* 左側：品牌視覺區*/}
            <RegisterBackgroup />
            {/* 右側：表單區 */}
            <RegisterForm />
        </div>
    );
}