const pool = require("../db");

exports.getBalance = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT balance, username FROM kod_users WHERE id = $1",
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ balance: Number(user.balance), username: user.username });
  } catch (err) {
    console.error("Balance error:", err);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, role FROM kod_users WHERE id = $1",
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
