import Navbar from "@/app/ui/dashboard/Navbar";
import ProductCard from "@/app/ui/dashboard/ProductCard";

// 假設這是從資料庫獲取的資料
const products = [
  { id: "1", product_name: "Vintage Camera", price: 2400, image_url: "/api/placeholder/600/400", category: "TECH" },
  { id: "2", product_name: "Retro Car", price: 850000, image_url: "/api/placeholder/600/400", category: "COLLECTION" },
  { id: "3", product_name: "Street View", price: 1200, image_url: "/api/placeholder/600/400", category: "PHOTO" },
  { id: "4", product_name: "Morning Sun", price: 900, image_url: "/api/placeholder/600/400", category: "PHOTO" },
];

export default function HomePage() {
  return (
    <main className="bg-retro-bg min-h-screen">
      {/* 導航欄 */}
      <Navbar />
      
      {/* Hero Section - 品牌標語區 */}
      <section className="px-6 py-16 md:px-10 md:py-24 max-w-7xl mx-auto">
        <h1 className="text-retro-ink text-5xl md:text-7xl font-extrabold tracking-tighter leading-none italic">
          THE <br /> ARCHIVE.
        </h1>
        <p className="mt-6 text-retro-slate text-lg font-medium max-w-md leading-relaxed">
          捕捉生活中的顆粒感。這裡不只是商店，而是一個關於時間與光影的收藏室。
        </p>
      </section>

      {/* 商品過濾標籤 (簡單範例) */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-12 flex gap-4 overflow-x-auto pb-4">
        {["All Collections", "Photography", "Tech", "Lifestyle"].map((tab) => (
          <button key={tab} className="whitespace-nowrap px-6 py-2 rounded-full border border-retro-ink/10 text-sm font-bold text-retro-slate hover:bg-retro-ink hover:text-retro-bg transition-all">
            {tab}
          </button>
        ))}
      </div>

      {/* 商品網格區 */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.product_name}
              price={product.price}
              image={product.image_url}
              category={product.category}
            />
          ))}
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="border-t border-retro-ink/5 py-12 px-6 text-center">
        <p className="text-retro-slate/40 text-[10px] tracking-[0.3em] uppercase">
          Curated by Gemini • 2026 Archive Series
        </p>
      </footer>
    </main>
  );
}