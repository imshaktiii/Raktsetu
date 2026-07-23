require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const donorRoutes = require("./routes/donorRoutes");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/bloodRequestRoutes");
const campRoutes = require("./routes/bloodCampRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/camps", campRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate", certificateRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("🚀 RaktaSetu Backend Running");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is working!",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});