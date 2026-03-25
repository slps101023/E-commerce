import Image from 'next/image';
import Navbar from '@/app/ui/dashboard/Navbar';
import axios from 'axios';
import ProductCard from '@/app/ui/dashboard/Product/ProductCard';
import CategoryFilter from '@/app/ui/dashboard/Product/CategoryFilter';

export default async function Gallery() {

    // 拿取商品資料
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    let products = [];
    try {
        const res = await fetch(`${baseUrl}/products`, { cache: 'no-store' });
        if (res.ok) {
            products = await res.json();
        }
    } catch (error) {
        console.error("無法取得商品:", error);
    }


    return (
        <main className="bg-retro-bg min-h-screen">
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
                <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12 space-y-16">
                    {/* 第一層：品牌標誌與元數據 */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-retro-ink/10 pb-12 relative">
                        <div className="space-y-6">
                            <h2 className="text-retro-ink text-6xl md:text-8xl font-black tracking-tighter italic leading-[0.8] hover:skew-x-2 transition-transform duration-500 cursor-default">
                                ARCHIVE
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 bg-retro-ink rotate-45 animate-pulse" />
                                <p className="text-retro-slate text-xs md:text-sm font-medium tracking-tight opacity-70">
                                    Selected pieces for your daily archive.
                                </p>
                            </div>
                        </div>

                        {/* 右側資訊塊：UX 資訊層級優化 */}
                        <div className="flex gap-10 md:gap-16">
                            <div className="space-y-2">
                                <p className="text-retro-slate/30 text-[9px] tracking-[0.4em] uppercase font-black">Last Updated</p>
                                <p className="text-retro-ink text-[11px] font-bold tracking-widest uppercase italic">2026 EDITION — VOL. 01</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-retro-slate/30 text-[9px] tracking-[0.4em] uppercase font-black">System</p>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <p className="text-retro-ink text-[11px] font-bold uppercase tracking-widest">Live</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 第二層：導航與過濾器 (UX: 滾動時可考慮做 Sticky) */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 flex-1">
                            {/* 標籤設計：UI 對齊感 */}
                            <div className="flex items-center gap-4 shrink-0 group">
                                <div className="h-[1px] w-12 bg-retro-ink/20 group-hover:w-16 transition-all duration-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black tracking-[0.4em] text-retro-slate/30 uppercase leading-none">Explore</span>
                                    <span className="text-[11px] font-bold tracking-[0.1em] text-retro-ink uppercase mt-1">Collections</span>
                                </div>
                            </div>

                            {/* CategoryFilter: UX 增加橫向漸層遮罩防止內容被硬切斷 */}
                            <div className="relative flex-1 group">
                                <CategoryFilter />
                            </div>
                        </div>

                        {/* 右側 metadata：增加 UX 引導感 */}
                        <div className="hidden lg:flex items-center gap-8 text-retro-slate/40">
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-black tracking-[0.3em] uppercase">Page</span>
                                <span className="text-[11px] font-bold text-retro-ink/60">01 / 01</span>
                            </div>
                            <div className="h-8 w-[1px] bg-retro-ink/10" />
                            <div className="flex flex-col items-start max-w-[80px]">
                                <span className="text-[8px] font-black tracking-[0.2em] uppercase leading-tight">Scroll to Discover</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            id={product.product_id}
                            name={product.product_name}
                            price={product.price}
                            image={product.image_url}
                            category={product.category}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}