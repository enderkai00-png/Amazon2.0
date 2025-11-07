const express = require('express');
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Simple health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Auth: signup (role = client|seller)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
    if (role === 'client') {
      const [r] = await pool.query('INSERT INTO clients (name,email,password) VALUES (?,?,?)', [name, email, password]);
      return res.json({ id: r.insertId, name, email, role: 'client' });
    } else {
      const [r] = await pool.query('INSERT INTO sellers (name,email,password) VALUES (?,?,?)', [name, email, password]);
      return res.json({ id: r.insertId, name, email, role: 'seller' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Auth: login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
    if (role === 'client') {
      const [rows] = await pool.query('SELECT id,name,email FROM clients WHERE email = ? AND password = ? LIMIT 1', [email, password]);
      if (!rows || rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      return res.json({ user: rows[0], role: 'client' });
    } else {
      const [rows] = await pool.query('SELECT id,name,email FROM sellers WHERE email = ? AND password = ? LIMIT 1', [email, password]);
      if (!rows || rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      return res.json({ user: rows[0], role: 'seller' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Products listing with search and filters
app.get('/api/products', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    if (q) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${q}%`, `%${q}%`);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(Number(maxPrice));
    }
    sql += ' ORDER BY created_at DESC LIMIT 100';
    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Product detail
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
    if (!rows || rows.length === 0) return res.status(404).json({ error: 'Not found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Cart endpoints
app.post('/api/cart', async (req, res) => {
  try {
    const { client_id, product_id, quantity } = req.body;
    if (!client_id || !product_id) return res.status(400).json({ error: 'Missing fields' });
    const [r] = await pool.query('INSERT INTO carts (client_id, product_id, quantity) VALUES (?,?,?)', [client_id, product_id, quantity || 1]);
    return res.json({ id: r.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/cart/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const [rows] = await pool.query(
      'SELECT c.id, c.quantity, p.id as product_id, p.title, p.price, p.image FROM carts c JOIN products p ON c.product_id = p.id WHERE c.client_id = ?',
      [clientId]
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
