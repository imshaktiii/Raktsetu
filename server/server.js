require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const donorRoutes = require("./routes/donorRoutes");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/bloodRequestRoutes");

const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);


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