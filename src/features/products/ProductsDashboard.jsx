import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import ProductDetailModal from '../../components/ProductDetailModal';
import Cart from '../../components/Cart';
import Checkout from '../checkout/Checkout';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCachedProducts } from '../../hooks/useCachedProducts';

const ProductsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coffeeProducts, setCoffeeProducts] = useState([]);

  // Use cached products hook to avoid refetching when switching tabs
  const { products: cachedProducts, isLoading, refresh: refreshProducts } = useCachedProducts();

  // Transform and set products from cache
  useEffect(() => {
    if (cachedProducts && cachedProducts.length > 0) {
      const transformedProducts = cachedProducts.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name,
        price: parseFloat(item.discounted_price) || parseFloat(item.original_price) || 0,
        originalPrice: item.original_price && parseFloat(item.original_price) !== parseFloat(item.discounted_price) 
          ? parseFloat(item.original_price) 
          : null,
        category: item.category || 'Other',
        image: item.picture || 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
        description: item.description || 'A delicious menu item',
        rating: 5,
        reviews: 0,
        inStock: item.status && (item.status.toLowerCase() === 'in stock' || item.status.toLowerCase() === 'available'),
        discount: item.original_price && item.discounted_price 
          ? Math.round(((parseFloat(item.original_price) - parseFloat(item.discounted_price)) / parseFloat(item.original_price)) * 100)
          : null,
        prepTime: item.prep_time ? `${item.prep_time} mins` : '5 mins',
        vegetarian: true,
      }));
      setCoffeeProducts(transformedProducts);
    }
  }, [cachedProducts]);

  // Dynamically extract categories from products
  const categories = useMemo(() => {
    const uniqueCategories = ['All'];
    const categorySet = new Set();
    coffeeProducts.forEach(product => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    return [...uniqueCategories, ...Array.from(categorySet).sort()];
  }, [coffeeProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = coffeeProducts;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      // Keep original order
    }

    return filtered;
  }, [selectedCategory, searchQuery, priceRange, sortBy, coffeeProducts]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (orderData) => {
    console.log('Order confirmed:', orderData);
    // Clear cart after successful order
    setCart([]);
    // You can add API call here to submit order to backend
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 text-center">
            ☕ Premium Coffee & Frappés
          </h1>
          <p className="text-amber-100 text-center text-sm sm:text-base md:text-lg">
            Discover our delicious selection of freshly brewed coffee and refreshing frappés
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64`}>
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-amber-700" />
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-amber-700"
                      />
                      <span className="text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min: ₱{priceRange.min.toFixed(0)}</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange.min}
                      onChange={e => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max: ₱{priceRange.max.toFixed(0)}</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange.max}
                      onChange={e => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange({ min: 0, max: 500 });
                  setSearchQuery('');
                }}
                className="w-full bg-amber-100 text-amber-900 font-semibold py-2 rounded-lg hover:bg-amber-200 transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search coffees..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none bg-white flex items-center gap-2"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Refresh Button */}
              <button
                onClick={refreshProducts}
                disabled={isLoading}
                className="px-4 py-2 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>⟳</span> Refresh
              </button>

              {/* Toggle Filters Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-amber-100 text-amber-900 font-semibold rounded-lg hover:bg-amber-200 transition duration-300 flex items-center gap-2"
              >
                <SlidersHorizontal size={20} />
                Filters
              </button>
            </div>

            {/* Results Counter */}
            <p className="text-gray-600 text-sm mb-4">
              {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} of ${coffeeProducts.length} products`}
            </p>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading menu items...</p>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : !isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : null
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">About Us</h4>
              <p className="text-sm">Premium coffee shop serving the finest brews and frappés since 2020.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Menu</h4>
              <ul className="text-sm space-y-2">
                <li><button className="hover:text-amber-400 transition cursor-pointer">Espresso</button></li>
                <li><button className="hover:text-amber-400 transition cursor-pointer">Lattes</button></li>
                <li><button className="hover:text-amber-400 transition cursor-pointer">Frappés</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Hours</h4>
              <p className="text-sm">Mon-Fri: 6am - 8pm<br />Sat-Sun: 7am - 9pm</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-sm">📞 (555) 123-4567<br />📧 info@brewhaven.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm">&copy; 2026 BrewHaven. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
};

export default ProductsDashboard;