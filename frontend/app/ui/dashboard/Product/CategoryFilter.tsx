"use client";

import { cn } from "@/lib/utils";

export const categories = ["全部商品", "3C", "運動", "生活", "家具", "服飾"] as const;

type Category = typeof categories[number];

type CategoryFilterProps = {
    active: Category;
    onChange: (category: Category) => void;
};

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-10 py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 border-t border-b border-retro-ink/5 py-6">
                <div className="relative flex-1 overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-retro-bg to-transparent z-10 pointer-events-none md:hidden" />

                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1 px-1 py-4">
                        {categories.map((item) => {
                            const isActive = active === item;
                            return (
                                <button
                                    key={item}
                                    onClick={() => onChange(item)}
                                    className={cn(
                                        "group relative whitespace-nowrap rounded-full px-6 py-2.5 text-[11px] md:text-xs font-bold transition-all duration-500",
                                        "border border-retro-ink/10 text-retro-slate hover:border-retro-ink/40",
                                        isActive && [
                                            "border-retro-ink bg-retro-ink text-retro-bg",
                                            "shadow-[0_10px_25px_-5px_rgba(26,47,56,0.2)]",
                                            "scale-105 -translate-y-0.5" // UI: 選中時微浮起
                                        ]
                                    )}
                                >
                                    <span className="relative z-10">{item}</span>
                                    {isActive && (
                                        <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}