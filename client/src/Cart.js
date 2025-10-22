import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.type === "Box" ? item.boxPrice : item.packetPrice;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 600 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id + item.type}>
              <h3>{item.name} ({item.type})</h3>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateCartItem(item.id, item.type, Number(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id, item.type)}>Remove</button>
            </div>
          ))}
          <h2>Subtotal: R{subtotal}</h2>
          <h2>Delivery Fee: R{deliveryFee}</h2>
          <h2>Total: R{total}</h2>
          <button onClick={() => navigate("/checkout", { state: { total } })}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
