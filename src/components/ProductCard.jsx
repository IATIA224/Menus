import React from 'react';
import { ShoppingCart, Coffee } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Category Badge */}
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-amber-900">₱{product.price.toFixed(0)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₱{product.originalPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* Prep Time & Stock */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Coffee size={16} className="text-amber-700" />
            {product.prepTime}
          </span>
          {product.inStock ? (
            <span className="text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 px-4 py-2 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition duration-300 text-sm"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-white font-semibold rounded-lg hover:from-amber-800 hover:to-amber-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
