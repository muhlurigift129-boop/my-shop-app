import React from "react";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1 style={{ animation: "move 2s infinite alternate" }}>MGS Traders</h1>
      <style>
        {`
          @keyframes move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
