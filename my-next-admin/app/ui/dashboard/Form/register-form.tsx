"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";

// 引入 UI 元件
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// 1. 定義註冊驗證 Schema
const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username too long."),
    email: z
        .string()
        .email("Invalid email format."),
    password: z
        .string()
        .min(8, "Security code must be at least 8 characters."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();

    // 2. 初始化表單
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    // 3. 提交處理
    async function onSubmit(data: RegisterFormValues) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
                username: data.username,
                email: data.email,
                password: data.password
            });

            if (response.status === 201) {
                toast.success("Registration successful!");
                router.push('/dashboard/Login');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status;
                const errorMessage = error.response?.data?.error;

                if (statusCode === 404 || statusCode === 500) {
                    // 這裡可以根據後端回傳的錯誤內容判斷是否引導去註冊
                    toast.error("Account already exists. Redirecting to login...");
                    router.push('/dashboard/Login');
                } else {
                    toast.error(errorMessage || "Something went wrong. Please try again.");
                }
                return;
            }

            toast.error("Something went wrong. Please try again.");
        }
    }

    // 提取共同的 Input 樣式以利維護
    const archiveInputStyle = "w-full bg-transparent border-0 border-b border-retro-ink/10 rounded-none shadow-none px-0 py-3 text-retro-ink font-bold placeholder:text-retro-ink/10 focus-visible:ring-0 focus-visible:border-retro-ink outline-none transition-all placeholder:text-[10px] placeholder:tracking-[0.2em]";

    return (
        <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 relative bg-retro-bg h-full min-h-screen">

            {/* 返回商店 */}
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
                    <div className="h-0.5 w-12 bg-retro-ink/10" />
                    <p className="text-[11px] font-bold text-retro-slate/50 tracking-[0.1em] uppercase">
                        請輸入您的詳細資訊以建立帳號
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-10">
                    <form id="archive-register-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="space-y-8">

                            {/* Username */}
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="group space-y-1">
                                        <FieldLabel className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors">
                                            Username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="TYPE YOUR NAME"
                                            className={archiveInputStyle}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Email */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="group space-y-1">
                                        <FieldLabel className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors">
                                            Email Address
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="EXAMPLE@MAIL.COM"
                                            className={archiveInputStyle}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Password */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="group space-y-1">
                                        <FieldLabel className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors">
                                            Security Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="••••••••"
                                            className={`${archiveInputStyle} placeholder:tracking-[0.5em]`}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    form="archive-register-form"
                                    className="w-full bg-retro-ink text-retro-bg py-6 h-auto rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(26,47,56,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(26,47,56,0.3)] hover:scale-[1.01] active:scale-[0.98]"
                                >
                                    Create Account
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>

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

            {/* Footer */}
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
    );
}