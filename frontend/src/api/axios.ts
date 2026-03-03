// 定義商品介面 (對應資料庫欄位)
export interface Product {
    product_id: number;
    product_name: string;
    category: string;
    price: string; 
    stock_quantity: number;
    image_url: string;
}