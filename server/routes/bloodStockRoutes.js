const express = require("express");
const router = express.Router();
const { getBloodStock } = require("../controllers/bloodStockController");

router.get("/", getBloodStock);

module.exports = router;
