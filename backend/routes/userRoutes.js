const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { getBalance, getProfile } = require("../controllers/userController");

router.get("/balance", verifyToken, getBalance);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
