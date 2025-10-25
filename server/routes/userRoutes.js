// server/routes/userRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
let users = []; // temporary storage (replace with DB later)

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: "User created successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ id: user.id }, "YOUR_SECRET_KEY", { expiresIn: "1d" });
  res.json({ token, name: user.name });
});

export default router;

