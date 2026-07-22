const BloodRequest = require("../models/BloodRequest");

// @desc    Create a blood request
// @route   POST /api/requests
// @access  Public
const createBloodRequest = async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      units,
      hospitalName,
      city,
      state,
      contactNumber,
      urgency,
      requiredDate,
    } = req.body;

    if (
      !patientName ||
      !bloodGroup ||
      !units ||
      !hospitalName ||
      !city ||
      !state ||
      !contactNumber ||
      !requiredDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const bloodRequest = await BloodRequest.create({
      patientName,
      bloodGroup,
      units,
      hospitalName,
      city,
      state,
      contactNumber,
      urgency: urgency || "Medium",
      requiredDate,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Blood request created successfully",
      request: bloodRequest,
    });
  } catch (error) {
    console.error("Error creating blood request:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not create blood request",
      error: error.message,
    });
  }
};

// @desc    Get all blood requests sorted by latest first
// @route   GET /api/requests
// @access  Public
const getBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not retrieve blood requests",
      error: error.message,
    });
  }
};

module.exports = {
  createBloodRequest,
  getBloodRequests,
};
