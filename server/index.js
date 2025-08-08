// server/index.js
require('dotenv').config(); // 加载 .env 或 Render 上的环境变量

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// 使用 DATABASE_URL 连接 PostgreSQL（兼容 Render）
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render 的 PostgreSQL 需要加这一行
  },
});

// 初始化表（自动建表）
pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => {
  console.error('Error creating table:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// 添加留言接口
app.post('/api/messages', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Missing name or message' });

  try {
    const result = await pool.query(
      `INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING *`,
      [name, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting message:', err);
    res.status(500).json({ error: err.message });
  }
});

// 获取所有留言接口
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM messages ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: err.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
