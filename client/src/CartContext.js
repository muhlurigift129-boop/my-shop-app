import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, type = "Box", quantity = 1) => {
    if (!product) {
      console.error("Product is missing:", product);
      return;
    }

    // Determine price based on type
    const price =
      type === "Box" ? product.boxPrice || 0 : product.packetPrice || 0;

    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.type === type
      );

      if (existing) {
        // If already in cart, update quantity
        return prev.map(item =>
          item.id === product.id && item.type === type
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Otherwise, add new item with price
      return [...prev, { ...product, type, quantity, price }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

