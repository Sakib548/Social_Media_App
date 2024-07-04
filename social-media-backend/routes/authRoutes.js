// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  token,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/token", token);
router.post("/logout", protect, logout);

module.exports = router;
