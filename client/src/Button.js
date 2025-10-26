// Button.js
import React from "react";

const Button = ({ children, onClick, type = "button", style = {} }) => {
  const baseStyle = {
    backgroundColor: "#007BFF", // modern blue
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const hoverStyle = {
    backgroundColor: "#0056b3", // darker blue on hover
    transform: "scale(1.05)",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...style }}
      onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.target.style, baseStyle)}
    >
      {children}
    </button>
  );
};

export default Button;
