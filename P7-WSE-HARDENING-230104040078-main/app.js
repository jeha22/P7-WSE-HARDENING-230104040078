// 1. Import Environment Variables
require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");

// 2. Import Library Baru (Keamanan & Logging) [cite: 24, 54, 55, 56, 57]
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const eventsRoutes = require("./routes/eventsRoutes"); // Pastikan path benar sesuai struktur [cite: 29]
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// 3. Middleware Keamanan & Logging Dasar [cite: 61, 62, 63, 65]
app.use(express.json());
app.use(helmet()); // Menambah Security Headers
app.use(cors({ origin: "http://localhost:5173" })); // Pembatasan Origin [cite: 63]
app.use(morgan("combined")); // Logging request ke console [cite: 65]

// 4. Implementasi Rate Limiter [cite: 67, 68, 69, 70]
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Menit
  max: process.env.RATE_LIMIT || 100, // Maksimal request dari .env [cite: 98]
  message: {
    status: "fail",
    message: "Terlalu banyak request, coba lagi nanti.",
  },
});
app.use(limiter);

// 5. Monitoring Endpoints (Health Check) [cite: 76, 77, 78]
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// 6. Routes
app.use("/api/events", eventsRoutes);

// Discovery Info [cite: 103]
app.get("/api/info", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "Events API",
    version: "1.0.0",
    description: "API sederhana untuk mengelola data events (UTS - Hardened)",
    endpoints: {
      getAll: "GET /api/events",
      getById: "GET /api/events/:id",
      create: "POST /api/events",
      update: "PUT /api/events/:id",
      delete: "DELETE /api/events/:id",
      health: "GET /api/health",
      info: "GET /api/info",
    },
  });
});

// 7. 404 Handler untuk endpoint tidak dikenal [cite: 103]
app.use((req, res, next) => {
  res.status(404).json({ status: "fail", message: "Endpoint tidak ditemukan" });
});

// 8. Centralized Global Error Handler [cite: 81, 82]
app.use(errorHandler);

// 9. Start Server dengan Environment Variable [cite: 84, 85, 97]
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
