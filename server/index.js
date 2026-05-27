// server/index.js
require('dotenv').config(); // Load environment variables from .env or Render

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to PostgreSQL using DATABASE_URL (compatible with Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render's PostgreSQL
  },
});

// Initialize table (auto-create if not exists)
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

// POST endpoint to add a new message
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

// GET endpoint to fetch all messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM messages ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});