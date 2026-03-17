import Image from 'next/image';
import Navbar from '@/app/ui/dashboard/Navbar';
import axios from 'axios';
import ProductCard from '@/app/ui/dashboard/ProductCard';
import CategoryFilter from '@/app/ui/dashboard/CategoryFilter';

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
                <header className="mb-20 space-y-12">
                    {/* 第一層：品牌主視覺區 */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-retro-ink/10 pb-12">
                        <div className="space-y-4">
                            {/* 品牌大標題：強化 italic 與字距 */}
                            <h2 className="text-retro-ink text-6xl md:text-8xl font-black tracking-tighter italic leading-[0.8]">
                                ARCHIVE
                            </h2>
                            <div className="flex items-center gap-3">
                                {/* 加入一個小的實心方塊或標誌，增加檔案感 */}
                                <div className="h-2 w-2 bg-retro-ink rotate-45" />
                                <p className="text-retro-slate text-sm font-medium tracking-tight opacity-70">
                                    Selected pieces for your daily archive.
                                </p>
                            </div>
                        </div>

                        {/* 右側：Metadata 資訊塊 */}
                        <div className="flex gap-12 text-right">
                            <div className="space-y-1">
                                <p className="text-retro-slate/30 text-[9px] tracking-[0.4em] uppercase font-black">
                                    Last Updated
                                </p>
                                <p className="text-retro-ink text-xs font-bold tracking-widest uppercase italic">
                                    2026 Edition — vol. 01
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-retro-slate/30 text-[9px] tracking-[0.4em] uppercase font-black">
                                    Availability
                                </p>
                                <div className="flex items-center justify-end gap-2">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-retro-ink opacity-40"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-retro-ink"></span>
                                    </span>
                                    <p className="text-retro-ink text-xs font-bold uppercase">In Stock</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 第二層：功能過濾區 */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            {/* 加上 Collections 的裝飾線條 */}
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-retro-ink/30" />
                                <span className="text-retro-slate/50 text-[10px] tracking-[0.4em] font-black uppercase">
                                    Collections
                                </span>
                            </div>

                            {/* 你的 CategoryFilter 元件 */}
                            <CategoryFilter />
                        </div>

                        {/* 右側：顯示目前頁數或小提示 */}
                        <div className="hidden lg:flex items-center gap-4 text-retro-slate/40 text-[10px] font-bold tracking-widest">
                            <span>PAGE 01 / 01</span>
                            <div className="h-4 w-[1px] bg-retro-ink/10" />
                            <span>SCROLL TO DISCOVER</span>
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