import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Run the table check once per cold start, not once per request.
let ready;
function ensureTable() {
  ready ??= sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  return ready;
}

export default async function handler(req, res) {
  try {
    await ensureTable();

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM messages ORDER BY created_at DESC LIMIT 50`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
      if (!name || !message) return res.status(400).json({ error: 'Missing name or message' });
      if (name.length > 50 || message.length > 500) {
        return res.status(400).json({ error: 'Message is too long' });
      }
      const rows = await sql`INSERT INTO messages (name, message) VALUES (${name}, ${message}) RETURNING *`;
      return res.status(201).json(rows[0]);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('messages api error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
