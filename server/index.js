import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pg, {Pool} from 'pg';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Server (ES Module) is running!');
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// api: 註冊寫入資料庫, 回傳user_id給前端, 前端再存到localStorage裡
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const result = await pool.query(
            'INSERT INTO users (user_name, user_email, user_phone, hash_password) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, phone, hashedPassword]
        );

        // 渲染profile頁面需要用到user_id, 但目前沒有登入功能
        const newUserId = result.rows[0].user_id;
        res.json({ user_id: newUserId, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});