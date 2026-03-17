"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // shadcn 內建的合併工具

const categories = ["全部商品", "3C 科技", "攝影生活", "文藝配件", "限量周邊"];

export default function CategoryFilter() {
    const [active, setActive] = useState("全部商品");

    return (
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
            {/* 分類容器：在手機版會自動產生橫向捲軸，桌機版則整齊排列 */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">

                {/* 小標籤：增加雜誌排版感 */}
                <span className="mr-4 whitespace-nowrap text-[10px] font-bold tracking-[0.2em] text-retro-slate/40 uppercase">
                    Filter
                </span>

                {categories.map((item) => (
                    <button
                        key={item}
                        onClick={() => setActive(item)}
                        className={cn(
                            // 基礎樣式：圓角、字體、過度動畫
                            "whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold transition-all duration-300",
                            // 未選中：淡淡的邊框，墨黑字體
                            "border border-retro-ink/10 text-retro-slate hover:border-retro-ink/40",
                            // 已選中：墨黑底、奶油字、浮起陰影
                            active === item &&
                            "border-retro-ink bg-retro-ink text-retro-bg shadow-[0_8px_20px_rgba(26,47,56,0.15)] scale-105"
                        )}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}