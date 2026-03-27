"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCartState } from "@/app/hooks/useCart";

type Props = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

const ProductCard = (props: Props) => {
    const { addItem } = useCartState();
    const formattedPrice = new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
    }).format(props.price);


    // todo: 將點擊加入購物
    const handleAddClick = () => {
        const productToAdd = {
            id: props.id,             // 統一用 id
            name: props.name,         // 統一用 name
            price: props.price,
            image: props.image,       // 統一用 image
            quantity: 1
        };
        addItem(productToAdd);
    };
    return (
        <Card className="group w-full max-w-sm overflow-hidden border-none bg-white/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl rounded-[32px] p-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                    src={props.image}
                    alt={props.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6 pt-4 space-y-4">
                <div className="space-y-2">
                    <Badge variant="secondary" className="bg-retro-bg text-retro-ink border-none px-2 py-0 text-[10px] font-bold">
                        {props.category}
                    </Badge>
                    <h3 className="text-retro-ink font-bold text-2xl tracking-tight">
                        {props.name}
                    </h3>
                    <p className="text-retro-slate font-semibold text-lg italic">
                        {formattedPrice}
                    </p>
                </div>

                <Button onClick={handleAddClick} className="w-full h-12 bg-retro-ink text-retro-bg hover:bg-retro-ink/90 rounded-2xl font-bold transition-all active:scale-95 shadow-lg">
                    加入購物車
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;