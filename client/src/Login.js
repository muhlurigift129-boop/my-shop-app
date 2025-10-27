import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    login(email, password);
    navigate("/home");
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={cardStyle}
      >
        <h2 style={titleStyle}>🔐 Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={buttonStyle}
          >
            Log In
          </motion.button>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Sign up
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

// 💅 Styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  background: "linear-gradient(135deg, #007bff, #00c8ff)",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  width: "350px",
  textAlign: "center",
};

const titleStyle = {
  color: "#007bff",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #007bff, #00c8ff)",
  border: "none",
  color: "white",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
  marginTop: "15px",
};

export default Login;

