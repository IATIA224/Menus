import React from 'react';
import { X, Clock, ShoppingCart, Coffee } from 'lucide-react';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-900 to-amber-800 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-700 rounded-full transition duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="w-full h-80 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Category & Stock */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full">
              {product.category}
            </span>
            {product.inStock ? (
              <span className="text-green-600 font-semibold text-lg">✓ In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold text-lg">✗ Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={20} className="text-amber-700" />
                <span className="text-sm font-semibold text-gray-700">Prep Time</span>
              </div>
              <p className="text-lg font-bold text-amber-900">{product.prepTime}</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Coffee size={20} className="text-amber-700" />
                <span className="text-sm font-semibold text-gray-700">Type</span>
              </div>
              <p className="text-lg font-bold text-amber-900">{product.category}</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="mb-2">
                <span className="text-sm font-semibold text-gray-700">Vegetarian</span>
              </div>
              <p className="text-lg font-bold text-amber-900">
                {product.vegetarian ? '✓ Yes' : '✗ No'}
              </p>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-amber-900">₱{product.price.toFixed(0)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₱{product.originalPrice.toFixed(0)}
                  </span>
                  {product.discount && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save {product.discount}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          {product.reviews && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{product.reviews}</span> customers have ordered this product
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={!product.inStock}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-800 text-white font-semibold rounded-lg hover:from-amber-800 hover:to-amber-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
