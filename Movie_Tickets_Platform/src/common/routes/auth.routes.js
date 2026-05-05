import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || password.length < 6) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const userExists = db
      .prepare("SELECT id FROM users WHERE email = ? OR username = ?")
      .get(email, username);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const result = db
      .prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)")
      .run(username, email, hash);

    res.status(201).json({
      message: "User registered",
      userId: result.lastInsertRowid,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;