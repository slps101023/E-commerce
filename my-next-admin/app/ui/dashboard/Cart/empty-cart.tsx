import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/ui/dashboard/Navbar';


export default function EmptyCart() {
    const router = useRouter();
    
    return (
        <main className="bg-retro-bg min-h-screen">
            <Navbar />
            <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
                <div className="rounded-full bg-retro-ink/5 p-10">
                    <ShoppingBag className="h-16 w-16 text-retro-ink/20" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black italic tracking-tighter text-retro-ink">您的購物車是空的</h2>
                    <p className="text-retro-slate opacity-70">好東西不等人，快去挑選心儀的商品吧！</p>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="rounded-full bg-retro-ink px-10 py-4 font-bold text-retro-bg transition-transform hover:scale-105 active:scale-95 shadow-xl"
                >
                    開始購物
                </button>
            </div>
        </main>
    );
}