const Donor = require("../models/Donor");
const CampRegistration = require("../models/CampRegistration");

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

const getDonationHistory = async (req, res) => {
  try {
    const registrations = await CampRegistration.find({
      donorId: req.user._id,
      status: "Donated"
    }).populate("campId").sort({ registrationDate: -1 });

    const history = registrations.map(reg => ({
      id: reg._id,
      date: reg.registrationDate ? new Date(reg.registrationDate).toLocaleDateString() : new Date(reg.createdAt).toLocaleDateString(),
      venue: reg.campId ? reg.campId.venue : "Local Camp Drive",
      campName: reg.campId ? reg.campId.campName : "Blood Donation Drive",
      units: 1,
      type: "Whole Blood"
    }));

    res.status(200).json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    console.error("Error loading donation history:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not load donation history",
      error: error.message
    });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded or file rejected by validation rules."
      });
    }

    const relativePath = `/uploads/profile/${req.file.filename}`;

    const donor = await Donor.findById(req.user._id);
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor profile not found"
      });
    }

    donor.profileImage = relativePath;
    await donor.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: relativePath
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not process file upload",
      error: error.message
    });
  }
};

module.exports = {
  searchDonors,
  getDonationHistory,
  uploadPhoto,
};