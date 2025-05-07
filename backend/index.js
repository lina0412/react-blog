const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog2',
  password: 'jeradilyna', // replace with your password
  port: 5432,
});

// GET all posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving posts');
  }
});

// GET a single post by ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving the post');
  }
});

// POST a new post
app.post('/posts', async (req, res) => {
  const { title, content, author, date, image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, author, date, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, content, author, date, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});

// DELETE a post by ID
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.status(200).send('Post deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting the post');
  }
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
