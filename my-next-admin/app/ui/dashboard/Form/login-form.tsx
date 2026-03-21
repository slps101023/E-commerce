"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// 引入你模板的 UI 元件
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// 1. 建立 Zod 驗證 Schema (配合 Archive 嚴謹的系統感)
const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Identification is required.")
        .max(50, "Identification too long."),
    password: z
        .string()
        .min(6, "Access code must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();

    // 2. 初始化 useForm
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    // 3. 提交處理 (套用模板的 toast 視覺效果)
    function onSubmit(data: z.infer<typeof loginSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
    }

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
                        Welcome <br /> Back
                    </h2>
                    <div className="h-0.5 w-12 bg-retro-ink/10" />
                    <p className="text-[11px] font-bold text-retro-slate/50 tracking-[0.1em] uppercase">
                        請輸入您的憑證以進入檔案庫
                    </p>
                </div>

                {/* Form 區域 */}
                <div className="space-y-10">
                    <form id="archive-login-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="space-y-8">

                            {/* Account (Username) Field */}
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="group space-y-1">
                                        <FieldLabel
                                            htmlFor="archive-username"
                                            // 保留你的復古雜誌樣式
                                            className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors"
                                        >
                                            Identification
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="archive-username"
                                            placeholder="USERNAME / EMAIL"
                                            autoComplete="off"
                                            aria-invalid={fieldState.invalid}
                                            // 覆蓋預設 UI 組件樣式，強制套用你的底線與透明背景設計
                                            className="w-full bg-transparent border-0 border-b border-retro-ink/10 rounded-none shadow-none px-0 py-3 text-retro-ink font-bold placeholder:text-retro-ink/10 focus-visible:ring-0 focus-visible:border-retro-ink outline-none transition-all placeholder:text-[10px] placeholder:tracking-[0.2em]"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="text-[10px] tracking-wider mt-2" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Password Field */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="group space-y-1">
                                        <div className="flex justify-between items-center">
                                            <FieldLabel
                                                htmlFor="archive-password"
                                                className="text-[9px] font-black tracking-[0.4em] text-retro-ink/30 uppercase group-focus-within:text-retro-ink transition-colors"
                                            >
                                                Access Code
                                            </FieldLabel>
                                            <button
                                                type="button"
                                                className="text-[8px] font-black text-retro-ink/30 uppercase tracking-[0.2em] hover:text-retro-ink transition-colors"
                                            >
                                                Forgot?
                                            </button>
                                        </div>
                                        <Input
                                            {...field}
                                            id="archive-password"
                                            type="password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                            className="w-full bg-transparent border-0 border-b border-retro-ink/10 rounded-none shadow-none px-0 py-3 text-retro-ink font-bold placeholder:text-retro-ink/10 focus-visible:ring-0 focus-visible:border-retro-ink outline-none transition-all placeholder:tracking-[0.5em]"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} className="text-[10px] tracking-wider mt-2" />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    form="archive-login-form"
                                    // 將你的 button 樣式直接灌給 UI 元件
                                    className="w-full bg-retro-ink text-retro-bg py-6 h-auto rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(26,47,56,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(26,47,56,0.3)] hover:scale-[1.01] active:scale-[0.98]"
                                >
                                    Authorize Access
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>

                    {/* Create Account Link */}
                    <div className="text-center pt-2">
                        <p className="text-[10px] font-bold text-retro-slate/40 tracking-widest uppercase">
                            New to the Archive? {' '}
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard/Register')}
                                className="text-retro-ink underline underline-offset-8 decoration-retro-ink/20 hover:decoration-retro-ink transition-all"
                            >
                                Create Account
                            </button>
                        </p>
                    </div>
                </div>

                {/* 內部 Footer（處理高度不足時的備案） */}
                <div className="md:hidden flex justify-between items-center text-[8px] font-black text-retro-ink/20 tracking-[0.4em] uppercase pt-12">
                    <span>© 2026 Archive Ltd.</span>
                    <span className="italic">Privacy / Terms</span>
                </div>
            </div>

            {/* 外部 Footer (桌機版絕對定位) */}
            <div className="absolute bottom-10 left-8 md:left-12 lg:left-24 right-8 md:right-12 lg:right-24 hidden md:flex justify-between items-center text-[8px] font-black text-retro-ink/20 tracking-[0.4em] uppercase">
                <div className="flex items-center gap-4">
                    <span>© 2026 Archive Ltd.</span>
                    <div className="w-1 h-1 bg-retro-ink/10 rounded-full" />
                    <span>Core v1.0</span>
                </div>
                <div className="flex gap-6">
                    <span className="cursor-pointer hover:text-retro-ink transition-colors">Privacy</span>
                    <span className="cursor-pointer hover:text-retro-ink transition-colors">Terms</span>
                </div>
            </div>
        </div>
    );
}