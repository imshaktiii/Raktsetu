const Donor = require("../models/Donor");
const BloodRequest = require("../models/BloodRequest");
const BloodCamp = require("../models/BloodCamp");
const CampRegistration = require("../models/CampRegistration");
const jwt = require("jsonwebtoken");

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

    // Check if user is logged in to return donor-specific data
    let donorStats = null;
    const tokenHeader = req.header("Authorization");
    if (tokenHeader) {
      try {
        const token = tokenHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const donor = await Donor.findById(decoded.id);
        if (donor) {
          // 1. Find upcoming donation
          const upcomingReg = await CampRegistration.findOne({
            donorId: donor._id,
            status: "Registered"
          }).populate("campId");

          let upcomingDonation = null;
          if (upcomingReg && upcomingReg.campId) {
            upcomingDonation = {
              campName: upcomingReg.campId.campName,
              venue: upcomingReg.campId.venue,
              city: upcomingReg.campId.city,
              date: upcomingReg.campId.date,
              startTime: upcomingReg.campId.startTime,
              endTime: upcomingReg.campId.endTime,
              status: upcomingReg.status
            };
          }

          // 2. Calculate eligibility
          let eligible = true;
          let nextEligibleDate = null;
          let daysRemaining = 0;

          if (donor.lastDonationDate) {
            const lastDonation = new Date(donor.lastDonationDate);
            const today = new Date();
            const diffTime = today - lastDonation;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 90) {
              eligible = false;
              const nextDate = new Date(lastDonation);
              nextDate.setDate(lastDonation.getDate() + 90);
              nextEligibleDate = nextDate.toISOString();
              daysRemaining = 90 - diffDays;
            }
          }

          donorStats = {
            eligible,
            nextEligibleDate,
            daysRemaining,
            upcomingDonation
          };
        }
      } catch (err) {
        console.error("Optional JWT decode failed:", err.message);
      }
    }

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
        donorStats,
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
