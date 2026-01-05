import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Categories Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        height: 'fit-content',
        position: 'sticky',
        top: '8rem',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '900',
          color: 'white',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{
            width: '0.375rem',
            height: '2rem',
            background: 'linear-gradient(to bottom, #a855f7, #ec4899)',
            borderRadius: '9999px'
          }}></span>
          Menu Categories
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#e2e8f0',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = 'white'}
          onMouseLeave={(e) => e.target.style.color = '#e2e8f0'}>
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={() => onCategoryChange('')}
              style={{
                width: '1.25rem',
                height: '1.25rem',
                cursor: 'pointer',
                accentColor: '#a855f7'
              }}
            />
            <span style={{
              marginLeft: '0.75rem',
              fontWeight: '600'
            }}>
              All Menu Items
            </span>
          </label>
          {categories.map((cat) => (
            <label key={cat} style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#e2e8f0',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#e2e8f0'}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                  accentColor: '#a855f7'
                }}
              />
              <span style={{
                marginLeft: '0.75rem',
                fontWeight: '600'
              }}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        position: 'sticky',
        top: '20rem',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '900',
          color: 'white',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{
            width: '0.375rem',
            height: '2rem',
            background: 'linear-gradient(to bottom, #a855f7, #ec4899)',
            borderRadius: '9999px'
          }}></span>
          Price Range
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '900',
                color: 'white'
              }}>
                Minimum
              </label>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                background: 'linear-gradient(to right, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                ${priceRange.min}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange.min}
              onChange={(e) => onPriceChange({ ...priceRange, min: Number(e.target.value) })}
              style={{
                width: '100%',
                height: '0.75rem',
                background: '#334155',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                accentColor: '#a855f7'
              }}
            />
          </div>
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '900',
                color: 'white'
              }}>
                Maximum
              </label>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                background: 'linear-gradient(to right, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                ${priceRange.max}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange.max}
              onChange={(e) => onPriceChange({ ...priceRange, max: Number(e.target.value) })}
              style={{
                width: '100%',
                height: '0.75rem',
                background: '#334155',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                accentColor: '#a855f7'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
