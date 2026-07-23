const Donor = require("../models/Donor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Register Donor
// ======================
const registerDonor = async (req, res) => {
  try {
    // Check if email already exists
    const existingDonor = await Donor.findOne({
      email: req.body.email,
    });

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create donor
    const donor = new Donor({
      ...req.body,
      password: hashedPassword,
    });

    // Save donor
    await donor.save();

    res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Login Donor
// ======================
const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if donor exists
    const donor = await Donor.findOne({ email });

    if (!donor) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, donor.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: donor._id,
        email: donor.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      donor: {
        id: donor._id,
        fullName: donor.fullName,
        email: donor.email,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
        state: donor.state,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
    try {
        res.json({
            success: true,
            donor: req.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
  registerDonor,
  loginDonor,
  getProfile
};
