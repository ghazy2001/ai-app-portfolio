const asyncHandler = require("express-async-handler");
const Visitor = require("../models/Visitor");

// @desc    Track a visit
// @route   POST /api/analytics/track
// @access  Public
const trackVisit = asyncHandler(async (req, res) => {
  const { page } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  // Simple deduplication: Check if same IP visited same page in last 10 minutes
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const existingVisit = await Visitor.findOne({
    ip,
    page,
    visitDate: { $gte: tenMinutesAgo },
  });

  if (!existingVisit) {
    await Visitor.create({
      ip,
      page,
      userAgent,
    });
    res.status(201).json({ message: "Visit tracked" });
  } else {
    res.status(200).json({ message: "Visit already tracked recently" });
  }
});

// @desc    Get analytics stats
// @route   GET /api/analytics/stats
// @access  Private (Admin)
const getAnalytics = asyncHandler(async (req, res) => {
  // 1. Total Visits
  const totalVisits = await Visitor.countDocuments();

  // 2. Visits Today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayVisits = await Visitor.countDocuments({
    visitDate: { $gte: todayStart },
  });

  // 3. Top Pages
  const topPages = await Visitor.aggregate([
    { $group: { _id: "$page", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // 4. Recent Visits (Log)
  const recentVisits = await Visitor.find().sort({ visitDate: -1 }).limit(10);

  res.status(200).json({
    totalVisits,
    todayVisits,
    topPages,
    recentVisits,
  });
});

module.exports = {
  trackVisit,
  getAnalytics,
};
