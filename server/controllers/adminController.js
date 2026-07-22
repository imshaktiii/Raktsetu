const Donor = require("../models/Donor");
const BloodRequest = require("../models/BloodRequest");
const BloodCamp = require("../models/BloodCamp");

// @desc    Get all donors
// @route   GET /api/admin/donors
// @access  Private/Admin
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not load donors directory",
      error: error.message,
    });
  }
};

// @desc    Delete a donor
// @route   DELETE /api/admin/donors/:id
// @access  Private/Admin
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }
    await donor.deleteOne();
    res.status(200).json({
      success: true,
      message: "Donor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete donor",
      error: error.message,
    });
  }
};

// @desc    Get all requests
// @route   GET /api/admin/requests
// @access  Private/Admin
const getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not load requests list",
      error: error.message,
    });
  }
};

// @desc    Delete a request
// @route   DELETE /api/admin/requests/:id
// @access  Private/Admin
const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found",
      });
    }
    await request.deleteOne();
    res.status(200).json({
      success: true,
      message: "Blood request deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete request",
      error: error.message,
    });
  }
};

// @desc    Get all camps
// @route   GET /api/admin/camps
// @access  Private/Admin
const getCamps = async (req, res) => {
  try {
    const camps = await BloodCamp.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: camps.length,
      camps,
    });
  } catch (error) {
    console.error("Error fetching camps:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not load camps schedule",
      error: error.message,
    });
  }
};

// @desc    Delete a camp
// @route   DELETE /api/admin/camps/:id
// @access  Private/Admin
const deleteCamp = async (req, res) => {
  try {
    const camp = await BloodCamp.findById(req.params.id);
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: "Blood camp not found",
      });
    }
    await camp.deleteOne();
    res.status(200).json({
      success: true,
      message: "Blood camp deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting camp:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete camp",
      error: error.message,
    });
  }
};

module.exports = {
  getDonors,
  deleteDonor,
  getRequests,
  deleteRequest,
  getCamps,
  deleteCamp,
};
