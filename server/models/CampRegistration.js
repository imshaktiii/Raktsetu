const mongoose = require("mongoose");

const campRegistrationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    campId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BloodCamp",
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Registered", "Donated"],
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CampRegistration", campRegistrationSchema);
