import React from 'react';

const ItemTable = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        No items found.
      </div>
    );
  }

  const formatPeso = (value) => `₱${Number(value ?? 0).toLocaleString('en-PH')}`;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Original Price</th>
            <th className="px-4 py-2 text-left">Discounted Price</th>
            <th className="px-4 py-2 text-left">Prep Time</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2 max-w-xs truncate" title={item.description}>
                {item.description}
              </td>
              <td className="px-4 py-2">{formatPeso(item.original_price)}</td>
              <td className="px-4 py-2">{formatPeso(item.discounted_price)}</td>
              <td className="px-4 py-2">{item.prep_time} mins</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    String(item.status).toLowerCase() === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;