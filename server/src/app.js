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
  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
  } else if (process.env.NODE_ENV === "production") {
    message = "Internal Server Error";
  }

  res.status(statusCode).json({ error: message });
});

module.exports = app;