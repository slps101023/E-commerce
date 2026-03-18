module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/my-next-admin/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/my-next-admin/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/my-next-admin/app/hooks/useCart.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCartState",
    ()=>useCartState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$12_$40$types$2b$react_eb330d7298f943e2e77325310678c5dd$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.12_@types+react_eb330d7298f943e2e77325310678c5dd/node_modules/zustand/esm/react.mjs [app-rsc] (ecmascript)");
;
// 使用 Zustand 創建購物車狀態管理
const useCartState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$12_$40$types$2b$react_eb330d7298f943e2e77325310678c5dd$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["create"])((set)=>({
        items: [],
        // 加入購物車（進階邏輯：重複加入時只增加數量）
        addItem: (product)=>set((state)=>{
                const existingItem = state.items.find((item)=>item.id === product.id);
                if (existingItem) {
                    return {
                        items: state.items.map((item)=>item.id === product.id ? {
                                ...item,
                                quantity: item.quantity + 1
                            } : item)
                    };
                }
                return {
                    items: [
                        ...state.items,
                        {
                            ...product,
                            quantity: 1
                        }
                    ]
                };
            }),
        removeItem: (id)=>set((state)=>({
                    items: state.items.filter((item)=>item.id !== id)
                })),
        updateQuantity: (id, delta)=>set((state)=>({
                    items: state.items.map((item)=>item.id === id ? {
                            ...item,
                            quantity: Math.max(1, item.quantity + delta)
                        } : item)
                })),
        clearCart: ()=>set({
                items: []
            })
    }));
;
}),
"[project]/my-next-admin/app/dashboard/Cart/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$next$2d$admin$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-next-admin/app/hooks/useCart.ts [app-rsc] (ecmascript)");
;
function Cart() {
    const { items, updateQuantity, removeItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$next$2d$admin$2f$app$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useCartState"])();
    return "Cart Page";
} // const CartPage = () => {
 //   const { items, updateQuantity, removeItem } = useCartState();
 //   const navigate = useNavigate();
 //   // UX: 管理勾選狀態
 //   const [selectedItems, setSelectedItems] = useState(items.map(i => i.id));
 //   // 計算總價
 //   const totalPrice = items
 //     .filter(item => selectedItems.includes(item.id))
 //     .reduce((sum, item) => sum + item.price * item.quantity, 0);
 //   const toggleSelect = (id) => {
 //     setSelectedItems(prev =>
 //       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
 //     );
 //   };
 //   if (items.length === 0) {
 //     return (
 //       <div className="empty-cart-view">
 //         <div className="empty-icon">🛒</div>
 //         <h2>您的購物車是空的</h2>
 //         <p>好東西不等人，快去挑選心儀的商品吧！</p>
 //         <button className="go-shopping-btn" onClick={() => navigate('/')}>
 //           開始購物
 //         </button>
 //       </div>
 //     );
 //   }
 //   return (
 //     <div className="cart-page-layout">
 //       {/* 左側：商品清單 */}
 //       <div className="cart-main">
 //         <div className="cart-header">
 //           <h2>購物車 ({items.length})</h2>
 //           <button className="clear-all-btn" onClick={() => {/* 實作清空邏輯 */ }}>清空購物車</button>
 //         </div>
 //         <div className="cart-list">
 //           {items.map((item) => (
 //             <div key={item.id} className={`cart-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}>
 //               <div className="item-left">
 //                 <input
 //                   type="checkbox"
 //                   checked={selectedItems.includes(item.id)}
 //                   onChange={() => toggleSelect(item.id)}
 //                   className="cart-checkbox"
 //                 />
 //                 <div className="item-img-box">
 //                   <img src={item.image} alt={item.name} />
 //                 </div>
 //               </div>
 //               <div className="item-info">
 //                 <h4 className="item-name">{item.name}</h4>
 //                 <p className="item-spec">規格：預設型號</p>
 //                 <p className="item-price">${item.price.toLocaleString()}</p>
 //               </div>
 //               <div className="item-right">
 //                 <div className="quantity-control">
 //                   <button
 //                     onClick={() => updateQuantity(item.id, -1)}
 //                     disabled={item.quantity <= 1}
 //                   >−</button>
 //                   <input type="number" value={item.quantity} readOnly />
 //                   <button onClick={() => updateQuantity(item.id, 1)}>+</button>
 //                 </div>
 //                 <div className="item-actions">
 //                   <button className="action-btn wishlist-btn">
 //                     <span>♡</span> 移至追蹤
 //                   </button>
 //                   <button
 //                     className="action-btn delete-btn"
 //                     onClick={() => removeItem(item.id)}
 //                   >
 //                     <span>🗑</span> 刪除
 //                   </button>
 //                 </div>
 //               </div>
 //             </div>
 //           ))}
 //         </div>
 //       </div>
 //       {/* 右側：結算看板 (Sticky Summary) */}
 //       <div className="cart-summary">
 //         <div className="summary-card">
 //           <h3>訂單摘要</h3>
 //           <div className="summary-row">
 //             <span>小計 ({selectedItems.length} 件商品)</span>
 //             <span>${totalPrice.toLocaleString()}</span>
 //           </div>
 //           <div className="summary-row">
 //             <span>運費</span>
 //             <span className="free-shipping">免運費</span>
 //           </div>
 //           <hr />
 //           <div className="summary-row total">
 //             <span>總計</span>
 //             <span className="total-amount">${totalPrice.toLocaleString()}</span>
 //           </div>
 //           <button className="checkout-btn" disabled={selectedItems.length === 0}>
 //             前往結帳 ({selectedItems.length})
 //           </button>
 //         </div>
 //       </div>
 //     </div>
 //   );
 // };
 // export default CartPage;
}),
"[project]/my-next-admin/app/dashboard/Cart/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/my-next-admin/app/dashboard/Cart/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__491d7de2._.js.map