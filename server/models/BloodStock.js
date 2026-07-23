const mongoose = require("mongoose");

const bloodStockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Government", "Red Cross", "Private"],
      default: "Government"
    },
    address: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    website: {
      type: String
    },
    stock: {
      type: Map,
      of: {
        bags: { type: Number, default: 0 },
        status: { type: String, enum: ["Available", "Low", "Critical", "Unavailable"], default: "Unavailable" }
      },
      default: {
        "A+": { bags: 0, status: "Unavailable" },
        "A-": { bags: 0, status: "Unavailable" },
        "B+": { bags: 0, status: "Unavailable" },
        "B-": { bags: 0, status: "Unavailable" },
        "AB+": { bags: 0, status: "Unavailable" },
        "AB-": { bags: 0, status: "Unavailable" },
        "O+": { bags: 0, status: "Unavailable" },
        "O-": { bags: 0, status: "Unavailable" }
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("BloodStock", bloodStockSchema);
