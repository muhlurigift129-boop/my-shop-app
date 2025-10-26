import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  // Redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #007bff, #00c6ff)",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Animated Logo */}
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          animation: "float 2s infinite ease-in-out",
          letterSpacing: "2px",
          textShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        🛍 MGS Traders
      </div>

      {/* Loading text */}
      <p
        style={{
          marginTop: "20px",
          fontSize: "18px",
          opacity: "0.9",
          animation: "fadeIn 1.5s ease-in-out infinite alternate",
        }}
      >
        Loading your shopping experience...
      </p>

      {/* Inline CSS Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }

          @keyframes fadeIn {
            0% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Welcome;

