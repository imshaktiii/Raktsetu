const express = require("express");
const router = express.Router();
const { getCertificateDetails } = require("../controllers/certificateController");

router.get("/:donorId", getCertificateDetails);

module.exports = router;
