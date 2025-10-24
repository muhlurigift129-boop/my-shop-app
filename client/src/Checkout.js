import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [deliveryType, setDeliveryType] = useState('Delivery');
  const [address, setAddress] = useState('');

  const subtotal = cart.reduce((sum, item) => {
    const price = item.type === 'Box' ? item.boxPrice : item.packetPrice;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 600 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    const res = await fetch('http://localhost:5000/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total, item_name: 'Noodles Order' })
    });
    const data = await res.json();
    clearCart();
    window.location.href = data.url;
  };

  return (
    <div>
      <h1>Checkout</h1>
      <label>
        <input type="radio" checked={deliveryType==='Delivery'} onChange={()=>setDeliveryType('Delivery')}/> Delivery
      </label>
      <label>
        <input type="radio" checked={deliveryType==='Collect'} onChange={()=>setDeliveryType('Collect')}/> Collect
      </label>

      {deliveryType==='Delivery' && (
        <input type="text" placeholder="Enter your address" value={address} onChange={e=>setAddress(e.target.value)} />
      )}

      <h2>Total: R{total}</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
