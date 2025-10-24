import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

const products = [
  { id: 1, name: 'Beef Flavour', image: '/images/beef.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 2, name: 'Chicken Flavour', image: '/images/chicken.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 3, name: 'Vegetable Flavour', image: '/images/vegetable.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 4, name: 'Cheese Flavour', image: '/images/cheese.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 5, name: 'Curry Flavour', image: '/images/curry.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 6, name: 'Spicy Beef Flavour', image: '/images/spicy-beef.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 7, name: 'Steak & Chops Flavour', image: '/images/steak-chops.jpg', boxPrice: 200, packetPrice: 20 },
  { id: 8, name: 'Roast Lamb Flavour', image: '/images/roast-lamb.jpg', boxPrice: 200, packetPrice: 20 },
];

const ProductList = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useContext(CartContext);

  const handleOptionChange = (productId, type, quantity) => {
    setSelectedOptions(prev => ({ ...prev, [productId]: { type, quantity } }));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>🍜 MGS Traders – Noodles Shop</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px',
      }}>
        {products.map(product => {
          const option = selectedOptions[product.id] || { type: 'Box', quantity: 1 };
          return (
            <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '10px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px' }} />
              <h3>{product.name}</h3>
              <p>📦 Box: R{product.boxPrice}</p>
              <p>🥢 Packet: R{product.packetPrice}</p>
              <select value={option.type} onChange={e => handleOptionChange(product.id, e.target.value, option.quantity)}>
                <option value="Box">Box</option>
                <option value="Packet">Packet</option>
              </select>
              <input
                type="number"
                min="1"
                value={option.quantity}
                onChange={e => handleOptionChange(product.id, option.type, Number(e.target.value))}
              />
              <button onClick={() => addToCart(product, option.type, option.quantity)}>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
