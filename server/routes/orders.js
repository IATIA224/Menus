const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// ========== DINE-IN ORDERS ==========

// Create a new dine-in order
router.post('/dine-in', async (req, res) => {
  try {
    console.log('Received dine-in order request:', req.body);
    
    const { customerName, tableNumber, phoneNumber, notes, paymentMethod, subtotal, total, items } = req.body;

    // Validation
    if (!customerName || !tableNumber || !paymentMethod || !items) {
      console.log('Validation failed:', { customerName, tableNumber, paymentMethod, items });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
      INSERT INTO dine_in_orders (customer_name, table_number, phone_number, notes, payment_method, subtotal, total, items, order_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, customer_name, table_number, created_at, order_status
    `;

    console.log('Executing query with params:', [
      customerName,
      tableNumber,
      phoneNumber || null,
      notes || null,
      paymentMethod,
      subtotal,
      total,
      JSON.stringify(items),
      'pending'
    ]);

    const result = await pool.query(query, [
      customerName,
      tableNumber,
      phoneNumber || null,
      notes || null,
      paymentMethod,
      subtotal,
      total,
      JSON.stringify(items),
      'pending'
    ]);

    console.log('Order created successfully:', result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Dine-in order created successfully',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating dine-in order:', err);
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// ========== DELIVERY ORDERS ==========

// Create a new delivery order
router.post('/delivery', async (req, res) => {
  try {
    console.log('Received delivery order request:', req.body);
    
    const { customerName, phoneNumber, deliveryAddress, notes, paymentMethod, subtotal, deliveryFee, total, items } = req.body;

    // Validation
    if (!customerName || !phoneNumber || !deliveryAddress || !paymentMethod || !items) {
      console.log('Validation failed:', { customerName, phoneNumber, deliveryAddress, paymentMethod, items });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
      INSERT INTO delivery_orders (customer_name, phone_number, delivery_address, notes, payment_method, subtotal, delivery_fee, total, items, order_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, customer_name, phone_number, created_at, order_status
    `;

    console.log('Executing query with params:', [
      customerName,
      phoneNumber,
      deliveryAddress,
      notes || null,
      paymentMethod,
      subtotal,
      deliveryFee || 50,
      total,
      JSON.stringify(items),
      'pending'
    ]);

    const result = await pool.query(query, [
      customerName,
      phoneNumber,
      deliveryAddress,
      notes || null,
      paymentMethod,
      subtotal,
      deliveryFee || 50,
      total,
      JSON.stringify(items),
      'pending'
    ]);

    console.log('Delivery order created successfully:', result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Delivery order created successfully',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating delivery order:', err);
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// Get all dine-in orders (for admin)
router.get('/dine-in/list', async (req, res) => {
  try {
    const query = `
      SELECT id, customer_name, table_number, phone_number, payment_method, subtotal, total, items, order_status, created_at, updated_at
      FROM dine_in_orders
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching dine-in orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

// Get all delivery orders (for admin)
router.get('/delivery/list', async (req, res) => {
  try {
    const query = `
      SELECT id, customer_name, phone_number, delivery_address, payment_method, subtotal, delivery_fee, total, items, order_status, created_at, updated_at
      FROM delivery_orders
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching delivery orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

// Get dine-in order by ID
router.get('/dine-in/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT id, customer_name, table_number, phone_number, payment_method, subtotal, total, items, order_status, created_at, updated_at
      FROM dine_in_orders
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
});

// Get delivery order by ID
router.get('/delivery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT id, customer_name, phone_number, delivery_address, payment_method, subtotal, delivery_fee, total, items, order_status, created_at, updated_at
      FROM delivery_orders
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
});

// Update dine-in order status
router.patch('/dine-in/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const query = `
      UPDATE dine_in_orders
      SET order_status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, customer_name, table_number, order_status, updated_at
    `;

    const result = await pool.query(query, [status, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order', details: err.message });
  }
});

// Update delivery order status
router.patch('/delivery/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const query = `
      UPDATE delivery_orders
      SET order_status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, customer_name, phone_number, order_status, updated_at
    `;

    const result = await pool.query(query, [status, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: result.rows[0]
    });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order', details: err.message });
  }
});

module.exports = router;
