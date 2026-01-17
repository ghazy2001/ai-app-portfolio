const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // e.g. Full-time, Remote
    description: { type: String, required: true },
    image: { type: String }, // URL to image
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
