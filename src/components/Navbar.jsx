import React, { useState } from 'react';
import { Coffee, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = ({ cartCount = 0, onCartClick = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-amber-900 to-amber-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Coffee className="w-8 h-8 text-yellow-400" />
            <span className="text-white text-2xl font-bold hidden sm:inline">
              BrewHaven
            </span>
            <span className="text-white text-xl font-bold sm:hidden">
              Brew
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white hover:text-yellow-400 transition duration-300 font-medium">
              Home
            </a>
            <a href="#menu" className="text-white hover:text-yellow-400 transition duration-300 font-medium">
              Menu
            </a>
            <a href="#about" className="text-white hover:text-yellow-400 transition duration-300 font-medium">
              About
            </a>
            <a href="#contact" className="text-white hover:text-yellow-400 transition duration-300 font-medium">
              Contact
            </a>
          </div>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-amber-700 transition duration-300"
            >
              <ShoppingCart className="w-6 h-6 text-yellow-400" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-amber-700 transition duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-yellow-400" />
              ) : (
                <Menu className="w-6 h-6 text-yellow-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-amber-700">
            <a
              href="#home"
              className="block px-4 py-2 text-white hover:bg-amber-700 rounded transition duration-300"
            >
              Home
            </a>
            <a
              href="#menu"
              className="block px-4 py-2 text-white hover:bg-amber-700 rounded transition duration-300"
            >
              Menu
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-white hover:bg-amber-700 rounded transition duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-white hover:bg-amber-700 rounded transition duration-300"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
