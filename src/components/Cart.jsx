import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  {/* Item Image and Info */}
                  <div className="flex gap-4 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-amber-700 font-bold">₱{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 hover:bg-gray-100 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold text-gray-800">
                      ₱{(item.price * item.quantity).toFixed(0)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 space-y-4">
          {items.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-amber-700">₱{total.toFixed(0)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white font-bold py-3 rounded-lg hover:from-amber-800 hover:to-amber-900 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
