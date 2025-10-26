import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product, type, price) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.type === type
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, type, price, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId, type) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === productId && item.type === type))
    );
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

