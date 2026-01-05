import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }){
  const [items, setItems] = useState([]);

  const add = (item) => setItems(prev => [...prev, item]);
  const remove = (id) => setItems(prev => prev.filter(i=>i.id !== id));
  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  return useContext(CartContext);
}
