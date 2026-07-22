const express = require("express");
const router = express.Router();

const { searchDonors } = require("../controllers/donorController");

// Search donors
router.get("/search", searchDonors);

module.exports = router;