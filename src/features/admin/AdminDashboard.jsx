import React, { useEffect, useState } from 'react';
import ItemTable from './ItemTable';
import DineInOrdersTable from './DineInOrdersTable';
import DeliveryOrdersTable from './DeliveryOrdersTable';
import { getAllItems, getAllDineInOrders, getAllDeliveryOrders } from '../../services/itemService';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [dineInOrders, setDineInOrders] = useState([]);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dine-in'); // 'dine-in', 'delivery', or 'items'

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

  const fetchDineInOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllDineInOrders();
      setDineInOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Failed to fetch dine-in orders.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllDeliveryOrders();
      setDeliveryOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Failed to fetch delivery orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'dine-in') {
      fetchDineInOrders();
    } else if (activeTab === 'delivery') {
      fetchDeliveryOrders();
    } else {
      fetchItems();
    }
  }, [activeTab]);

  return (
    <div className="p-6 space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 flex-wrap">
        <button
          onClick={() => setActiveTab('dine-in')}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === 'dine-in'
              ? 'text-amber-700 border-b-2 border-amber-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Dine-In Orders
        </button>
        <button
          onClick={() => setActiveTab('delivery')}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === 'delivery'
              ? 'text-amber-700 border-b-2 border-amber-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Delivery Orders
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === 'items'
              ? 'text-amber-700 border-b-2 border-amber-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Menu Items
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (activeTab === 'dine-in') fetchDineInOrders();
            else if (activeTab === 'delivery') fetchDeliveryOrders();
            else fetchItems();
          }}
          className="px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition"
        >
          Refresh
        </button>
        {loading && <span className="text-gray-600">Loading...</span>}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded border border-red-200 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {/* Content */}
      {activeTab === 'dine-in' ? (
        <DineInOrdersTable orders={dineInOrders} onOrderUpdated={fetchDineInOrders} />
      ) : activeTab === 'delivery' ? (
        <DeliveryOrdersTable orders={deliveryOrders} onOrderUpdated={fetchDeliveryOrders} />
      ) : (
        <ItemTable items={items} />
      )}
    </div>
  );
};

export default AdminDashboard;