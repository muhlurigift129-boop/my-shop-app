import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./Checkout";
import SignUp from "./SignUp";
import Login from "./Login";
import Navbar from "./Navbar";

function App() {
  const [user, setUser] = useState(localStorage.getItem("token") ? "User" : null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
