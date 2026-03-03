import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pg, {Pool} from 'pg';

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

app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});