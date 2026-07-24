require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");


const donorRoutes = require("./routes/donorRoutes");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/bloodRequestRoutes");
const campRoutes = require("./routes/bloodCampRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const bloodStockRoutes = require("./routes/bloodStockRoutes");

const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const cleanOrigin = origin.replace(/\/$/, "");
    
    // Allow localhost (various ports)
    if (
      cleanOrigin.startsWith("http://localhost:") ||
      cleanOrigin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }
    
    // Allow any Vercel deployment URL matching *.vercel.app
    if (cleanOrigin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    
    // Allow FRONTEND_URL from env configuration
    if (process.env.FRONTEND_URL) {
      const cleanFrontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
      if (cleanOrigin === cleanFrontendUrl) {
        return callback(null, true);
      }
    }
    
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/camps", campRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/blood-stock", bloodStockRoutes);


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