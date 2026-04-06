import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pg, { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Cart from './modules/cart.js';

const app = express();
const PORT = process.env.PORT;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ MongoDB 連線成功！(ShopDB 準備就緒)');
    })
    .catch((err) => {
        console.error('❌ MongoDB 連線失敗，請檢查資料庫是否有啟動：');
        console.error(err);
    });

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // 允許來自前端的請求
        credentials: true, // 允許攜帶 cookie
    })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('🚀 Server (ES Module) is running!');
});

// JWT Token 驗證
// payload: { user_id: 123, ... }
function authenticateToken(Payload) {
    const user = Payload;
    const JWT_KEY = process.env.JWT_KEY;

    // 生成 JWT Token，並設定過期時間為 1 小時
    const token = jwt.sign(
        Payload,
        JWT_KEY,
        { expiresIn: '1h' }
    );
    return token;
}

async function updateCart(userId, cartItems) {
    try {
        const existingCart = await Cart.findOne({ userId: String(userId) });
        if (existingCart) {
            existingCart.items = cartItems.map(item => ({
                productId: String(item.id),
                productName: item.name,
                quantity: item.quantity,
                price: item.price,
                imageUrl: item.image,
            }));
            console.log('Updating existing cart for user:', userId, 'with items:', existingCart.items);
            await existingCart.save();
        } else {
            const newCart = new Cart({
                userId: String(userId),
                items: cartItems.map(item => ({
                    productId: String(item.id),
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    imageUrl: item.image,
                }))
            });
            console.log('Creating new cart for user:', userId, 'with items:', newCart.items);
            await newCart.save();
        }
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/cartItems', async (req, res) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        return res.status(401).json({ message: "您尚未登入或憑證已過期" });
    } else {
        try {
            const cart = await Cart.findOne({ userId: String(userId) });
            res.json(cart?.items || []);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            res.status(500).json({ error: 'Failed to fetch cart items' });
        }
    }
});

app.post('/api/updateCart', async (req, res) => {
    const userId = req.cookies.user_id;
    const cartItems = req.body.cartItems;
    if (!userId) {
        return res.status(401).json({ message: "您尚未登入或憑證已過期" });
    } else {
        try {
            await updateCart(userId, cartItems);
            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).json({ error: 'Failed to update cart' });
        }
    }
});


app.post('/api/auth/login', async (req, res) => {
    try {
        const { account, password } = req.body;
        const result = await pool.query(
            'SELECT id, user_name, hash_password FROM users WHERE user_email = $1',
            [account]
        );
        const currentUser = result.rows[0];

        const isMatch = await bcrypt.compare(password, result.rows[0].hash_password);
        if (isMatch) {
            const token = authenticateToken({ user_id: currentUser.id, username: currentUser.user_name });
            // 將 JWT Token 設置為 HttpOnly Cookie，並設定過期時間為 1 小時
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // http 環境下設為 false，https 環境下設為 true 
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            });

            // 將 user_id 寫入 cookie（非 HttpOnly，可讓前端讀取）
            res.cookie('user_id', String(currentUser.id), {
                httpOnly: false,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            });

            return res.status(200).json({
                username: currentUser.user_name,
                message: 'Login successful'
            });
        } else {
            // 密碼錯誤
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// api: 註冊寫入資料庫, 回傳id, user_name給前端
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (user_name, user_email, hash_password) VALUES ($1, $2, $3) RETURNING id, user_name',
            [username, email, hashedPassword]
        );
        const currentUser = result.rows[0];
        return res.status(201).json({
            username: currentUser.user_name,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.get('/api/auth/me', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "您尚未登入或憑證已過期" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        return res.status(200).json({
            user: {
                id: decoded.user_id,
                username: decoded.username
            }
        });
    } catch (error) {
        return res.status(401).json({ message: "無效的 Token" });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // http 環境下設為 false，https 環境下設為 true
        sameSite: 'lax'
    });
    res.clearCookie('user_id', {
        httpOnly: false,
        secure: false,
        sameSite: 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});


app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});