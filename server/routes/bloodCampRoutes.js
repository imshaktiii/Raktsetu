const express = require("express");
const router = express.Router();
const {
  createBloodCamp,
  getBloodCamps,
  getBloodCampById,
  registerForCamp,
} = require("../controllers/bloodCampController");

const authMiddleware = require("../middleware/authMiddleware");

router.route("/")
  .post(createBloodCamp)
  .get(getBloodCamps);

router.route("/:id")
  .get(getBloodCampById);

router.route("/:id/register")
  .put(authMiddleware, registerForCamp);

module.exports = router;
