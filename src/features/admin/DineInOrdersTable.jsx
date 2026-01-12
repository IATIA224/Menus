import React, { useState } from 'react';
import { updateDineInOrderStatus } from '../../services/itemService';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DineInOrdersTable = ({ orders, onOrderUpdated }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 text-gray-600 bg-white rounded-lg border border-gray-200">
        No dine-in orders found.
      </div>
    );
  }

  const formatPeso = (value) => `₱${Number(value ?? 0).toLocaleString('en-PH')}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await updateDineInOrderStatus(orderId, newStatus);
      if (onOrderUpdated) {
        onOrderUpdated();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'preparing':
        return 'bg-blue-100 text-blue-700';
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Customer Name</th>
            <th className="px-4 py-2 text-left">Table</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Payment</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Order Time</th>
            <th className="px-4 py-2 text-center">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 font-semibold text-gray-900">#{order.id}</td>
                <td className="px-4 py-2">{order.customer_name}</td>
                <td className="px-4 py-2 font-medium">Table {order.table_number}</td>
                <td className="px-4 py-2 font-semibold text-amber-700">{formatPeso(order.total)}</td>
                <td className="px-4 py-2">
                  <span className="capitalize text-sm">{order.payment_method}</span>
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.order_status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingOrderId === order.id}
                    className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer disabled:opacity-50 ${getStatusColor(
                      order.order_status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-gray-600 text-xs">{formatDate(order.created_at)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                    }
                    className="p-1 hover:bg-gray-200 rounded transition"
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </td>
              </tr>

              {/* Expanded Details Row */}
              {expandedOrderId === order.id && (
                <tr className="bg-gray-50">
                  <td colSpan="8" className="px-4 py-4">
                    <div className="space-y-3">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Order Items</h4>
                        <div className="bg-white rounded border border-gray-200 p-3 space-y-2">
                          {order.items && JSON.parse(order.items).map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span className="text-amber-700 font-medium">
                                {formatPeso(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                            <span>Subtotal</span>
                            <span className="text-amber-700">{formatPeso(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg text-gray-900">
                            <span>Total</span>
                            <span className="text-amber-700">{formatPeso(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Customer Information</h4>
                        <div className="bg-white rounded border border-gray-200 p-3 space-y-1 text-sm">
                          <p>
                            <span className="text-gray-600">Name:</span>{' '}
                            <span className="font-medium">{order.customer_name}</span>
                          </p>
                          <p>
                            <span className="text-gray-600">Table:</span>{' '}
                            <span className="font-medium">{order.table_number}</span>
                          </p>
                          {order.phone_number && (
                            <p>
                              <span className="text-gray-600">Phone:</span>{' '}
                              <span className="font-medium">{order.phone_number}</span>
                            </p>
                          )}
                          <p>
                            <span className="text-gray-600">Payment Method:</span>{' '}
                            <span className="font-medium capitalize">
                              {order.payment_method}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Notes */}
                      {order.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Special Notes</h4>
                          <div className="bg-white rounded border border-gray-200 p-3 text-sm text-gray-700">
                            {order.notes}
                          </div>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="text-xs text-gray-500">
                        <p>Created: {formatDate(order.created_at)}</p>
                        <p>Last Updated: {formatDate(order.updated_at)}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DineInOrdersTable;
