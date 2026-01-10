import { useState, useEffect } from 'react';
import { getAllItems } from '../services/itemService';

const CACHE_KEY = 'menu_items_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache duration

/**
 * Custom hook for fetching and caching menu products
 * Caches products in localStorage to avoid unnecessary API calls when switching tabs
 * @param {number} ttl - Cache time-to-live in milliseconds (default: 5 minutes)
 * @returns {Object} { products: Array, isLoading: boolean, error: string, refresh: Function }
 */
export const useCachedProducts = (ttl = CACHE_TTL) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // Check if cache is still valid
        if (now - timestamp < ttl) {
          return data;
        } else {
          // Cache expired, remove it
          localStorage.removeItem(CACHE_KEY);
        }
      }
    } catch (err) {
      console.error('Error reading cache:', err);
      localStorage.removeItem(CACHE_KEY);
    }
    return null;
  };

  const setCachedData = (data) => {
    try {
      // Remove picture field to reduce cache size
      const dataWithoutPictures = data.map(({ picture, ...item }) => item);
      
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: dataWithoutPictures,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.error('Error saving cache:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Check cache first
      const cachedData = getCachedData();
      if (cachedData) {
        setProducts(cachedData);
        setIsLoading(false);
        return;
      }

      // Fetch fresh data if not cached
      const data = await getAllItems();
      const validData = Array.isArray(data) ? data : [];
      
      setProducts(validData);
      setCachedData(validData);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load menu items. Please try again later.');
      
      // Try to use stale cache as fallback
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        try {
          const { data } = JSON.parse(cachedData);
          setProducts(data);
        } catch (e) {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
      setIsLoading(false);
    }
  };

  const refresh = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, refresh };
};
