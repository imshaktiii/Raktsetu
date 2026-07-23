const BloodCamp = require("../models/BloodCamp");
const CampRegistration = require("../models/CampRegistration");

// @desc    Create a new blood camp
// @route   POST /api/camps
// @access  Public
const createBloodCamp = async (req, res) => {
  try {
    const {
      campName,
      organizerName,
      organizerEmail,
      organizerPhone,
      venue,
      city,
      state,
      date,
      startTime,
      endTime,
      totalSeats,
      description,
      status,
    } = req.body;

    if (
      !campName ||
      !organizerName ||
      !organizerEmail ||
      !organizerPhone ||
      !venue ||
      !city ||
      !state ||
      !date ||
      !startTime ||
      !endTime ||
      !totalSeats
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all required fields.",
      });
    }

    const camp = await BloodCamp.create({
      campName,
      organizerName,
      organizerEmail,
      organizerPhone,
      venue,
      city,
      state,
      date,
      startTime,
      endTime,
      totalSeats: Number(totalSeats),
      registeredDonors: 0,
      description,
      status: status || "Upcoming",
    });

    res.status(201).json({
      success: true,
      message: "Blood camp created successfully",
      camp,
    });
  } catch (error) {
    console.error("Error creating blood camp:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not create blood camp",
      error: error.message,
    });
  }
};

// @desc    Get all blood camps sorted by date ascending
// @route   GET /api/camps
// @access  Public
const getBloodCamps = async (req, res) => {
  try {
    const camps = await BloodCamp.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: camps.length,
      camps,
    });
  } catch (error) {
    console.error("Error fetching blood camps:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not retrieve blood camps",
      error: error.message,
    });
  }
};

// @desc    Get a single blood camp by ID
// @route   GET /api/camps/:id
// @access  Public
const getBloodCampById = async (req, res) => {
  try {
    const camp = await BloodCamp.findById(req.params.id);
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: "Blood camp not found",
      });
    }
    res.status(200).json({
      success: true,
      camp,
    });
  } catch (error) {
    console.error("Error fetching blood camp:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not retrieve blood camp details",
      error: error.message,
    });
  }
};

// @desc    Register a donor for a blood camp
// @route   PUT /api/camps/:id/register
// @access  Public
const registerForCamp = async (req, res) => {
  try {
    const camp = await BloodCamp.findById(req.params.id);
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: "Blood camp not found",
      });
    }

    // Check if donor is already registered for this camp
    const existing = await CampRegistration.findOne({ donorId: req.user._id, campId: req.params.id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this Blood Camp."
      });
    }

    if (camp.registeredDonors >= camp.totalSeats) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. Camp seats are full.",
      });
    }

    await CampRegistration.create({
      donorId: req.user._id,
      campId: req.params.id,
      registrationDate: new Date(),
      status: "Registered"
    });

    camp.registeredDonors += 1;
    await camp.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered for blood camp",
      camp,
    });
  } catch (error) {
    console.error("Error registering for blood camp:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Registration could not be processed",
      error: error.message,
    });
  }
};

module.exports = {
  createBloodCamp,
  getBloodCamps,
  getBloodCampById,
  registerForCamp,
};
