const { Pool } = require('pg');
require('dotenv').config();

async function createDeliveryOrdersTable() {
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'Menus_db',
  });

  try {
    const query = `
      CREATE TABLE IF NOT EXISTS delivery_orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        delivery_address TEXT NOT NULL,
        notes TEXT,
        payment_method VARCHAR(50) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        delivery_fee DECIMAL(10, 2) DEFAULT 50,
        total DECIMAL(10, 2) NOT NULL,
        items JSONB NOT NULL,
        order_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(query);
    console.log('Delivery orders table created successfully!');
  } catch (err) {
    console.error('Error creating delivery orders table:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

// Run the migration
createDeliveryOrdersTable();
