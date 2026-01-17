const asyncHandler = require("express-async-handler");
const Visitor = require("../models/Visitor");

// @desc    Track a visit
// @route   POST /api/analytics/track
// @access  Public
const getClientIp = (req) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

  // Handle array (rare but possible in some frameworks)
  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  // Handle comma-separated list (take first one)
  if (typeof ip === "string" && ip.includes(",")) {
    ip = ip.split(",")[0];
  }

  return (ip || "").trim();
};

// @desc    Track a visit
// @route   POST /api/analytics/track
// @access  Public
const trackVisit = asyncHandler(async (req, res) => {
  const { page, visitorName } = req.body;
  const ip = getClientIp(req);
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
      visitorName: visitorName || "",
    });
    res.status(201).json({ message: "Visit tracked" });
  } else {
    // If name provided on re-visit, update it
    if (visitorName && existingVisit.visitorName !== visitorName) {
      existingVisit.visitorName = visitorName;
      await existingVisit.save();
    }
    res.status(200).json({ message: "Visit already tracked recently" });
  }
});

// @desc    Identify a visitor by name (updates past visits from IP)
// @route   POST /api/analytics/identify
// @access  Public
const identifyVisitor = asyncHandler(async (req, res) => {
  const { visitorName } = req.body;
  const ip = getClientIp(req);

  if (!visitorName) {
    res.status(400);
    throw new Error("Visitor name is required");
  }

  // Update all previous visits from this IP with the new name
  await Visitor.updateMany({ ip }, { $set: { visitorName } });

  res.status(200).json({ message: "Visitor identified successfully" });
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
  const recentVisits = await Visitor.find().sort({ visitDate: -1 }).limit(20);

  res.status(200).json({
    totalVisits,
    todayVisits,
    topPages,
    recentVisits,
  });
});

// @desc    Reset all analytics data
// @route   DELETE /api/analytics/reset
// @access  Private (Admin)
const resetAnalytics = asyncHandler(async (req, res) => {
  await Visitor.deleteMany({});
  res.status(200).json({ message: "Analytics data reset successfully" });
});

module.exports = {
  trackVisit,
  getAnalytics,
  identifyVisitor,
  resetAnalytics,
};
