import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Minus, Plus, Flame, Clock } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1) setQuantity(newQty);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  const renderSpicyLevel = (spicy) => {
    return [...Array(5)].map((_, i) => (
      <Flame
        key={i}
        size={18}
        style={{ color: i < spicy ? '#ef4444' : '#cbd5e1', fill: i < spicy ? '#ef4444' : 'none' }}
      />
    ));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
        borderRadius: '1.5rem',
        maxWidth: '48rem',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          background: 'linear-gradient(to right, rgba(139, 92, 246, 0.1), transparent)'
        }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#e2e8f0' }}>
            {product.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              background: 'rgba(139, 92, 246, 0.1)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d8b4fe',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.1)'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            {/* Image */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
              borderRadius: '1rem',
              height: '20rem',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              overflow: 'hidden'
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Details */}
            <div>
              {/* Category & Rating */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: '#a855f7'
                }}>
                  {product.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < product.rating ? '#fbbf24' : '#475569', fontSize: '1.25rem' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#d8b4fe' }}>
                    ({product.reviews || 0})
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {product.vegetarian && (
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#6ee7b7',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    🌱 Vegetarian
                  </span>
                )}
                {product.inStock ? (
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#6ee7b7',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    In Stock
                  </span>
                ) : (
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#fca5a5',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Price */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    ${product.price?.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span style={{
                      fontSize: '1rem',
                      color: '#64748b',
                      textDecoration: 'line-through',
                      fontWeight: 'bold'
                    }}>
                      ${product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <p style={{ color: '#6ee7b7', fontWeight: '600', marginTop: '0.5rem' }}>
                    Save ${(product.originalPrice - product.price)?.toFixed(2)} ({product.discount}% off)
                  </p>
                )}
              </div>

              {/* Description */}
              <p style={{
                color: '#cbd5e1',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {product.description}
              </p>

              {/* Spicy Level */}
              {product.spicy > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ color: '#d8b4fe', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Spice Level
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {renderSpicyLevel(product.spicy)}
                    <span style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>
                      {product.spicy}/5
                    </span>
                  </div>
                </div>
              )}

              {/* Prep Time */}
              {product.prepTime && (
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} style={{ color: '#a855f7' }} />
                  <span style={{ color: '#d8b4fe' }}>Prep time: {product.prepTime}</span>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ color: '#d8b4fe', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Ingredients
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {product.ingredients.map((ingredient, idx) => (
                      <span key={idx} style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: '#d8b4fe',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                      }}>
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(139, 92, 246, 0.2)', paddingTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#d8b4fe',
                marginBottom: '0.5rem'
              }}>
                Quantity
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '0.5rem',
                width: 'fit-content',
                background: 'rgba(139, 92, 246, 0.05)'
              }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  style={{
                    padding: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#a855f7',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#d8b4fe'}
                  onMouseLeave={(e) => e.target.style.color = '#a855f7'}
                >
                  <Minus size={18} />
                </button>
                <span style={{
                  padding: '0 1rem',
                  fontWeight: '600',
                  minWidth: '3rem',
                  textAlign: 'center',
                  color: '#e2e8f0'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  style={{
                    padding: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#a855f7',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#d8b4fe'}
                  onMouseLeave={(e) => e.target.style.color = '#a855f7'}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{
                  flex: 1,
                  background: product.inStock ? 'linear-gradient(to right, #9333ea, #ec4899)' : '#6b7280',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: product.inStock ? '0 0 20px rgba(147, 51, 234, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (product.inStock) {
                    e.target.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.5)';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.inStock) {
                    e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <ShoppingCart size={20} />
                Add to Order
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: isFavorite ? '#ef4444' : '#a855f7',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.1)'}
              >
                <Heart
                  size={20}
                  style={{
                    fill: isFavorite ? '#ef4444' : 'none'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;