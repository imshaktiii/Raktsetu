const express = require("express");
const router = express.Router();
const {
  getDonors,
  deleteDonor,
  getRequests,
  deleteRequest,
  getCamps,
  deleteCamp,
  getRegistrations,
  markAsDonated,
} = require("../controllers/adminController");

// Donors administration
router.route("/donors")
  .get(getDonors);
router.route("/donors/:id")
  .delete(deleteDonor);

// Requests administration
router.route("/requests")
  .get(getRequests);
router.route("/requests/:id")
  .delete(deleteRequest);

// Camps administration
router.route("/camps")
  .get(getCamps);
router.route("/camps/:id")
  .delete(deleteCamp);

// Registrations administration
router.route("/registrations")
  .get(getRegistrations);
router.route("/registrations/:id/donate")
  .put(markAsDonated);

module.exports = router;
