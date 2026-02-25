import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Server (ES Module) is running!');
});

app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});