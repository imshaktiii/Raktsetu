const express = require("express");
const router = express.Router();

const {
  registerDonor,
  loginDonor,
  getProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerDonor);
router.post("/login", loginDonor);

// Protected Route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;