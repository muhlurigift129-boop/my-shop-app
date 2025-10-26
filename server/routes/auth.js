import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const router = express.Router();

// Database
const dbPromise = open({
  filename: "./database.sqlite",
  driver: sqlite3.Database,
});

// JWT Secret
const JWT_SECRET = "mgs-secret-key";

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const db = await dbPromise;

  const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (existingUser) return res.status(400).json({ error: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);
  await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
    name,
    email,
    hashed,
  ]);

  res.json({ message: "Signup successful" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ message: "Login successful", token, user: { id: user.id, name: user.name } });
});

export default router;
