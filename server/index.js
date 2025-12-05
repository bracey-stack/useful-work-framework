const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Database setup
const dbPath = process.env.DB_PATH || path.join(__dirname, 'useful-work.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    axes TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('planned', 'completed')),
    created_at TEXT NOT NULL,
    completed_at TEXT,
    updated_at TEXT NOT NULL
  )
`);

// Middleware
app.use(cors());
app.use(express.json());

// GET all items
app.get('/api/items', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
    const parsed = items.map(item => ({
      ...item,
      axes: JSON.parse(item.axes)
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET items by status
app.get('/api/items/:status', (req, res) => {
  try {
    const { status } = req.params;
    if (!['planned', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const items = db.prepare('SELECT * FROM items WHERE status = ? ORDER BY created_at DESC').all(status);
    const parsed = items.map(item => ({
      ...item,
      axes: JSON.parse(item.axes)
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST new item
app.post('/api/items', (req, res) => {
  try {
    const { text, axes, status } = req.body;

    if (!text || !axes || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const now = new Date().toISOString();
    const completedAt = status === 'completed' ? now : null;

    const stmt = db.prepare(`
      INSERT INTO items (text, axes, status, created_at, completed_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(text, JSON.stringify(axes), status, now, completedAt, now);

    res.status(201).json({
      id: result.lastInsertRowid,
      text,
      axes,
      status,
      created_at: now,
      completed_at: completedAt,
      updated_at: now
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// PUT update item (e.g., mark as completed)
app.put('/api/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { text, axes, status } = req.body;

    const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const now = new Date().toISOString();
    const completedAt = status === 'completed' ? now : null;

    const stmt = db.prepare(`
      UPDATE items
      SET text = COALESCE(?, text),
          axes = COALESCE(?, axes),
          status = COALESCE(?, status),
          completed_at = ?,
          updated_at = ?
      WHERE id = ?
    `);

    stmt.run(
      text || null,
      axes ? JSON.stringify(axes) : null,
      status || null,
      completedAt,
      now,
      id
    );

    const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    res.json({
      ...updated,
      axes: JSON.parse(updated.axes)
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  try {
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    db.prepare('DELETE FROM items WHERE id = ?').run(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Useful Work API running on port ${PORT}`);
});
