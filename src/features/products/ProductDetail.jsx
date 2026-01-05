import React from 'react';

export default function ProductDetail({ product }){
  if(!product) return <div>Select a product</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
}
