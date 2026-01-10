import React, { useEffect, useState } from 'react';
import ItemTable from './ItemTable';
import { getAllItems } from '../../services/itemService';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Failed to fetch items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={fetchItems}
          className="px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition"
        >
          Refresh
        </button>
        {loading && <span className="text-gray-600">Loading...</span>}
      </div>

      {error && (
        <div className="p-3 rounded border border-red-200 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      <ItemTable items={items} />
    </div>
  );
};

export default AdminDashboard;