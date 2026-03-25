"use client";

import { Trash2, Heart, Minus, Plus } from "lucide-react";

type CartItem = {
    id: number | string;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type Props = {
    items: CartItem[];
    selectedItems: Array<number | string>;
    toggleSelect: (id: number | string) => void;
    updateQuantity: (id: number | string, delta: number) => void;
    removeItem: (id: number | string) => void;
};

export default function CartProductList({
    items,
    selectedItems,
    toggleSelect,
    updateQuantity,
    removeItem,
}: Props) {
    return (
        <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`group relative flex gap-6 rounded-[32px] border border-retro-ink/5 bg-white/40 p-6 backdrop-blur-sm transition-all hover:bg-white/60 ${selectedItems.includes(item.id) ? "ring-2 ring-retro-ink" : ""
                        }`}
                >
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelect(item.id)}
                            className="h-5 w-5 cursor-pointer accent-retro-ink"
                        />
                    </div>

                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-retro-bg">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                        <div>
                            <div className="flex justify-between">
                                <h4 className="text-xl font-bold tracking-tight text-retro-ink">{item.name}</h4>
                                <p className="font-black italic text-retro-ink">${item.price.toLocaleString()}</p>
                            </div>
                            <p className="text-xs font-medium text-retro-slate/60 mt-1 uppercase tracking-widest">
                                Model: Default Archive
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center rounded-full border border-retro-ink/10 bg-retro-bg/50 p-1">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="rounded-full p-2 hover:bg-white disabled:opacity-30"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="rounded-full p-2 hover:bg-white"
                                >
                                    <Plus className="h-3 w-3" />
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <button className="text-retro-slate/40 hover:text-retro-ink transition-colors">
                                    <Heart className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-retro-slate/40 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}