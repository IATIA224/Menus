const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function getAllItems() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error('Failed to fetch items:', err);
    throw err;
  }
}

export async function getItemById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/items/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch item ${id}:`, err);
    throw err;
  }
}

export async function getItemsByCategory(category) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/items/category/${encodeURIComponent(category)}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch items for category ${category}:`, err);
    throw err;
  }
}

export async function getAllDineInOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/dine-in/list`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error('Failed to fetch dine-in orders:', err);
    throw err;
  }
}

export async function getAllDeliveryOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/delivery/list`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error('Failed to fetch delivery orders:', err);
    throw err;
  }
}

export async function getDineInOrderById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/dine-in/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch dine-in order ${id}:`, err);
    throw err;
  }
}

export async function updateDineInOrderStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/dine-in/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Failed to update order ${id} status:`, err);
    throw err;
  }
}

export async function updateDeliveryOrderStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/delivery/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error (${res.status}): ${text || 'Unknown error'}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Failed to update order ${id} status:`, err);
    throw err;
  }
}