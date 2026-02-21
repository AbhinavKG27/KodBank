const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

exports.register = async (req, res) => {
  const { uid, username, email, password, phone } = req.body;
  try {
    // Check if username or email already exists
    const existing = await pool.query(
      "SELECT id FROM kod_users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO kod_users (uid, username, email, password, phone, role, balance)
       VALUES ($1, $2, $3, $4, $5, 'Customer', 100000)`,
      [uid, username, email, hashedPassword, phone || null]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, username, email, password, role FROM kod_users WHERE username = $1",
      [username]
    );
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store token in user_tokens table
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await pool.query(
      "INSERT INTO user_tokens (token, user_id, expiry) VALUES ($1, $2, $3)",
      [token, user.id, expiry]
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user: { username: user.username, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
