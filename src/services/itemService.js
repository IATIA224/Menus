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