import { useContext } from "react";
import { CartContext } from "./CartContext";

const { cart, removeFromCart, clearCart, total } = useContext(CartContext);

return (
  <div>
    <h2>Your Cart</h2>
    {cart.length === 0 ? <p>Cart is empty</p> : (
      <>
        <ul>
          {cart.map((item) => (
            <li key={item.id + item.type}>
              {item.name} ({item.type}) × {item.quantity} = R{item.price}
              <button onClick={() => removeFromCart(item.id, item.type)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: R{total}</p>
        <button onClick={clearCart}>Clear Cart</button>
      </>
    )}
  </div>
);
