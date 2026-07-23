const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { searchDonors, getDonationHistory } = require("../controllers/donorController");

// Search donors
router.get("/search", searchDonors);

// Donation history
router.get("/history", authMiddleware, getDonationHistory);

module.exports = router;