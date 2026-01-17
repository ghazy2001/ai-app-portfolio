const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Serve static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
