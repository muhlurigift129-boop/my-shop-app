import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, type, quantity) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id && p.type === type);
      if (existing) {
        return prev.map(p =>
          p.id === product.id && p.type === type
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, { ...product, type, quantity }];
    });
  };

  const updateCartItem = (productId, type, quantity) => {
    setCart(prev =>
      prev.map(p =>
        p.id === productId && p.type === type ? { ...p, quantity } : p
      )
    );
  };

  const removeFromCart = (productId, type) => {
    setCart(prev => prev.filter(p => !(p.id === productId && p.type === type)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
