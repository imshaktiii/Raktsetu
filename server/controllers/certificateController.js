const Donor = require("../models/Donor");

// @desc    Get donor details for certificate generation
// @route   GET /api/certificate/:donorId
// @access  Public
const getCertificateDetails = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.donorId);
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor profile not found inside registry",
      });
    }

    // Generate certificate number dynamically
    const year = new Date().getFullYear();
    const certificateNumber = `RST-${year}-${donor._id.toString().substring(18).toUpperCase()}`;

    res.status(200).json({
      success: true,
      donor: {
        _id: donor._id,
        fullName: donor.fullName,
        bloodGroup: donor.bloodGroup,
        lastDonationDate: donor.lastDonationDate || new Date(),
        city: donor.city,
        state: donor.state,
        certificateNumber,
      },
    });
  } catch (error) {
    console.error("Error generating certificate details:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not generate certificate data",
      error: error.message,
    });
  }
};

module.exports = {
  getCertificateDetails,
};
