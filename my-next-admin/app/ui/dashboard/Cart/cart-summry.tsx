"use client";

type Props = {
    selectedItems: Array<number | string>;
    totalPrice: number;
};


export default function CartSummary({ selectedItems, totalPrice }: Props) {
    return (
        <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-[40px] border border-retro-ink bg-retro-ink p-8 text-retro-bg shadow-2xl">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-8">Summary</h3>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium opacity-70">
                        <span>Subtotal ({selectedItems.length} items)</span>
                        <span>${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium opacity-70">
                        <span>Shipping</span>
                        <span className="text-green-400 font-bold tracking-widest uppercase text-[10px]">Free</span>
                    </div>

                    <div className="my-8 h-[1px] w-full bg-retro-bg/20" />

                    <div className="flex items-end justify-between">
                        <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                        <span className="text-4xl font-black italic leading-none">${totalPrice.toLocaleString()}</span>
                    </div>
                </div>

                <button
                    disabled={selectedItems.length === 0}
                    className="mt-10 w-full rounded-2xl bg-retro-bg py-5 text-sm font-black uppercase tracking-[0.2em] text-retro-ink transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                >
                    Checkout Now ({selectedItems.length})
                </button>

                <p className="mt-6 text-center text-[10px] font-medium opacity-40 uppercase tracking-widest">
                    Secure payment processed via Archive Pay
                </p>
            </div>
        </div>
    );
}