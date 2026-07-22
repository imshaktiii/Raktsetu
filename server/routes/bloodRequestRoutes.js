const express = require("express");
const router = express.Router();
const {
  createBloodRequest,
  getBloodRequests,
} = require("../controllers/bloodRequestController");

router.route("/")
  .post(createBloodRequest)
  .get(getBloodRequests);

module.exports = router;
