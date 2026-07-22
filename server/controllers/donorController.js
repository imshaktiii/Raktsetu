const Donor = require("../models/Donor");

const searchDonors = async (req, res) => {

  const { bloodGroup, city } = req.query;

  const filter = {};

  if (bloodGroup) {
    filter.bloodGroup = bloodGroup;
  }

  if (city) {
    filter.city = city;
  }

  const donors = await Donor.find(filter).select("-password");

  res.status(200).json({
    success: true,
    count: donors.length,
    donors,
  });
};

module.exports = {
  searchDonors,
};