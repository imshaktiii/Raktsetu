const mongoose = require("mongoose");

const bloodCampSchema = new mongoose.Schema(
  {
    campName: {
      type: String,
      required: true,
    },
    organizerName: {
      type: String,
      required: true,
    },
    organizerEmail: {
      type: String,
      required: true,
    },
    organizerPhone: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    registeredDonors: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BloodCamp", bloodCampSchema);
