const express = require("express");
const authRoutes = require("./routes/auth_routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", require("./routes/vehicle_routes"));

module.exports = app;