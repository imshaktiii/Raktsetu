const express = require("express");
const router = express.Router();
const {
  createBloodCamp,
  getBloodCamps,
  getBloodCampById,
  registerForCamp,
} = require("../controllers/bloodCampController");

router.route("/")
  .post(createBloodCamp)
  .get(getBloodCamps);

router.route("/:id")
  .get(getBloodCampById);

router.route("/:id/register")
  .put(registerForCamp);

module.exports = router;
