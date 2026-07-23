const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth_routes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", require("./routes/vehicle_routes"));

// Global Error Handler for Production
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message;
  res.status(statusCode).json({ error: message });
});

module.exports = app;