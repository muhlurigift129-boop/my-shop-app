import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Home.css";

const Home = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { name: "Beef", image: "/images/beef.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Chicken", image: "/images/chicken.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Vegetable", image: "/images/vegetable.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Cheese", image: "/images/cheese.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Curry", image: "/images/curry.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Spicy Beef", image: "/images/spicy-beef.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Steak Chops", image: "/images/steak-chops.jpg", boxPrice: 200, packetPrice: 20 },
    { name: "Roast Lamb", image: "/images/roast-lamb.jpg", boxPrice: 200, packetPrice: 20 },
  ];

  const handleAddToCart = (product, type, quantity) => {
    const price = type === "box" ? product.boxPrice : product.packetPrice;
    addToCart({ ...product, type, quantity, price });
    alert(`${quantity} ${type}(s) of ${product.name} added to cart!`);
  };

  return (
    <div className="home-container">
      <h1 className="page-title">🍜 MGS Traders Product List</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Box: R{product.boxPrice} | Packet: R{product.packetPrice}</p>

            <div className="controls">
              <select id={`type-${index}`} className="select">
                <option value="box">Box</option>
                <option value="packet">Packet</option>
              </select>
              <input
                id={`qty-${index}`}
                type="number"
                min="1"
                placeholder="Qty"
                defaultValue="1"
                className="qty-input"
              />
            </div>

            <button
              className="add-btn"
              onClick={() => {
                const type = document.getElementById(`type-${index}`).value;
                const quantity = parseInt(document.getElementById(`qty-${index}`).value);
                const price = type === "box" ? product.boxPrice : product.packetPrice;
                handleAddToCart(product, type, price * quantity);
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

