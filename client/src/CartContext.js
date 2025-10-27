import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, type, price, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(it => it.id === product.id && it.type === type);
      if (existing) {
        return prev.map(it =>
          it.id === product.id && it.type === type ? { ...it, quantity: it.quantity + quantity, total: (it.quantity + quantity) * it.price } : it
        );
      }
      const item = { ...product, type, price, quantity, total: price * quantity };
      return [...prev, item];
    });
  };

  const removeFromCart = (productId, type) => {
    setCart(prev => prev.filter(it => !(it.id === productId && it.type === type)));
  };

  const updateQuantity = (productId, type, quantity) => {
    setCart(prev => prev.map(it => it.id === productId && it.type === type ? { ...it, quantity, total: it.price * quantity } : it));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

