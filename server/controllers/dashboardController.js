const Donor = require("../models/Donor");
const BloodRequest = require("../models/BloodRequest");
const BloodCamp = require("../models/BloodCamp");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Public
const getDashboardStats = async (req, res) => {
  try {
    // 1. Donor Stats
    const totalDonors = await Donor.countDocuments();
    const availableDonors = await Donor.countDocuments({ available: true });

    // 2. Blood Request Stats
    const totalBloodRequests = await BloodRequest.countDocuments();
    const activeBloodRequests = await BloodRequest.countDocuments({ status: "Pending" });

    // 3. Blood Camp Stats
    const totalBloodCamps = await BloodCamp.countDocuments();
    const upcomingBloodCamps = await BloodCamp.countDocuments({ status: "Upcoming" });

    // 4. Blood Group Distribution aggregation from Donors collection
    const bloodGroupDistribution = await Donor.aggregate([
      {
        $group: {
          _id: "$bloodGroup",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          bloodGroup: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    // 5. Monthly Registrations aggregation from Donors collection
    const monthlyRegistrations = await Donor.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          count: 1,
          _id: 0
        }
      }
    ]);

    // 6. Recent Blood Requests (latest 5)
    const recentBloodRequests = await BloodRequest.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // 7. Upcoming Blood Camps (nearest 5)
    const upcomingCamps = await BloodCamp.find({ status: "Upcoming" })
      .sort({ date: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalDonors,
        availableDonors,
        totalBloodRequests,
        activeBloodRequests,
        totalBloodCamps,
        upcomingBloodCamps,
        bloodGroupDistribution,
        monthlyRegistrations,
        recentBloodRequests,
        upcomingCamps,
      },
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not load dashboard statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
