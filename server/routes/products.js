const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all items/menu products
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT id, item_id, name, category, description, original_price, discounted_price, prep_time, status, picture
      FROM public.menu_items
      ORDER BY category, name
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// Get single item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT id, item_id, name, category, description, original_price, discounted_price, prep_time, status, picture
      FROM public.menu_items
      WHERE id = $1 OR item_id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

// Get items by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const query = `
      SELECT id, item_id, name, category, description, original_price, discounted_price, prep_time, status, picture
      FROM public.menu_items
      WHERE LOWER(category) = LOWER($1)
      ORDER BY name
    `;
    const result = await pool.query(query, [category]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

module.exports = router;
