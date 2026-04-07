import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // 1. 綁定使用者
    userId: { 
        type: String, 
        required: true, 
        unique: true  // 確保一個使用者只有一台購物車
    },
    // 2. 記住購物車內容 (只存 ID 和數量)
    items: [{
        productId: { 
            type: Number, 
            required: true 
        },
        productName: {
            type: String,
            required: true
        },
        quantity: { 
            type: Number, 
            default: 1, 
            min: 1 // 數量最少是 1
        },
        price: {
            type: String,
            required: true,
            min: 0 // 價格不能為負數
        },
        imageUrl: {
            type: String,
            required: true
        }
    }]
});

export default mongoose.model('Cart', cartSchema);