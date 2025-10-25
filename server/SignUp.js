import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/users/signup", { name, email, password });
      alert("User created! Please log in.");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
