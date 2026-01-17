const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    visitorName: {
      type: String, // Optional name provided by visitor
      default: "",
    },
    visitDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Visitor", visitorSchema);
