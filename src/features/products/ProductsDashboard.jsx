import React, { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import ProductDetailModal from '../../components/ProductDetailModal';
import { Search, SlidersHorizontal } from 'lucide-react';

const ProductsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Coffee Shop Products Data
  const coffeeProducts = [
    {
      id: 1,
      name: 'Classic Espresso',
      price: 150,
      originalPrice: null,
      category: 'Espresso',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Rich and bold single or double shot espresso',
      rating: 5,
      reviews: 342,
      inStock: true,
      discount: null,
      prepTime: '2 mins',
      vegetarian: true,
    },
    {
      id: 2,
      name: 'Caramel Frappé',
      price: 310,
      originalPrice: 380,
      category: 'Frappés',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Iced coffee blended with caramel sauce and whipped cream',
      rating: 5,
      reviews: 521,
      inStock: true,
      discount: 19,
      prepTime: '5 mins',
      vegetarian: true,
    },
    {
      id: 3,
      name: 'Vanilla Latte',
      price: 260,
      originalPrice: null,
      category: 'Lattes',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Smooth espresso with steamed milk and vanilla syrup',
      rating: 5,
      reviews: 287,
      inStock: true,
      discount: null,
      prepTime: '4 mins',
      vegetarian: true,
    },
    {
      id: 4,
      name: 'Chocolate Frappé',
      price: 330,
      originalPrice: 400,
      category: 'Frappés',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Creamy chocolate blend with espresso and whipped cream',
      rating: 5,
      reviews: 456,
      inStock: true,
      discount: 18,
      prepTime: '5 mins',
      vegetarian: true,
    },
    {
      id: 5,
      name: 'Cappuccino',
      price: 250,
      originalPrice: null,
      category: 'Lattes',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Espresso with equal parts steamed milk and foam',
      rating: 5,
      reviews: 398,
      inStock: true,
      discount: null,
      prepTime: '4 mins',
      vegetarian: true,
    },
    {
      id: 6,
      name: 'Strawberry Frappé',
      price: 330,
      originalPrice: 400,
      category: 'Frappés',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Refreshing strawberry blend with ice and whipped cream',
      rating: 4,
      reviews: 267,
      inStock: true,
      discount: 18,
      prepTime: '5 mins',
      vegetarian: true,
    },
    {
      id: 7,
      name: 'Americano',
      price: 210,
      originalPrice: null,
      category: 'Espresso',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Espresso shots topped with hot water for a lighter flavor',
      rating: 5,
      reviews: 324,
      inStock: true,
      discount: null,
      prepTime: '3 mins',
      vegetarian: true,
    },
    {
      id: 8,
      name: 'Hazelnut Latte',
      price: 275,
      originalPrice: 330,
      category: 'Lattes',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Warm espresso with steamed milk and hazelnut flavor',
      rating: 5,
      reviews: 213,
      inStock: true,
      discount: 17,
      prepTime: '4 mins',
      vegetarian: true,
    },
    {
      id: 9,
      name: 'Mocha Frappé',
      price: 350,
      originalPrice: 470,
      category: 'Frappés',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Delicious blend of espresso, chocolate, and coffee',
      rating: 5,
      reviews: 489,
      inStock: true,
      discount: 25,
      prepTime: '5 mins',
      vegetarian: true,
    },
    {
      id: 10,
      name: 'Macchiato',
      price: 285,
      originalPrice: null,
      category: 'Espresso',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Espresso marked with a touch of steamed milk foam',
      rating: 5,
      reviews: 278,
      inStock: true,
      discount: null,
      prepTime: '3 mins',
      vegetarian: true,
    },
    {
      id: 11,
      name: 'Mango Frappé',
      price: 320,
      originalPrice: 390,
      category: 'Frappés',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Tropical mango flavor blended with ice and cream',
      rating: 4,
      reviews: 195,
      inStock: true,
      discount: 18,
      prepTime: '5 mins',
      vegetarian: true,
    },
    {
      id: 12,
      name: 'Irish Coffee',
      price: 380,
      originalPrice: null,
      category: 'Specialty',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop',
      description: 'Rich coffee with Irish whiskey and whipped cream topping',
      rating: 5,
      reviews: 156,
      inStock: true,
      discount: null,
      prepTime: '6 mins',
      vegetarian: true,
    },
  ];

  const categories = ['All', 'Espresso', 'Lattes', 'Frappés', 'Specialty'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar cartCount={cart.length} onCartClick={() => console.log('Cart clicked')} />

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
              Showing {filteredProducts.length} of {coffeeProducts.length} products
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
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
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
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
    </div>
  );
};

export default ProductsDashboard;