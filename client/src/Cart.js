import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, setCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ Update quantity and total for an item
  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    newCart[index].total =
      newCart[index].type === "box"
        ? newCart[index].boxPrice * quantity
        : newCart[index].packetPrice * quantity;
    setCart(newCart);
  };

  // ✅ Remove item from cart
  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  // ✅ Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-text">
          Your cart is empty. Add some items to continue shopping.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-card" key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Type: {item.type}</p>
                  <p>
                    Price per {item.type}: R
                    {item.type === "box" ? item.boxPrice : item.packetPrice}
                  </p>
                  <div className="quantity-control">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value))
                      }
                    />
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  Total: R{item.total ? item.total.toFixed(2) : "0.00"}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: R{totalAmount.toFixed(2)}</h3>
            <div className="cart-actions">
              <button className="clear-btn" onClick={clearCart}>
                🧹 Clear Cart
              </button>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                💳 Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

