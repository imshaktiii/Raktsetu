const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const multer = require("multer");

const { searchDonors, getDonationHistory, uploadPhoto } = require("../controllers/donorController");

// Search donors
router.get("/search", searchDonors);

// Donation history
router.get("/history", authMiddleware, getDonationHistory);

// Upload photo with multer error handling
router.post("/upload-photo", authMiddleware, (req, res, next) => {
  upload.single("profileImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File is too large. Maximum size allowed is 2MB."
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
}, uploadPhoto);

module.exports = router;