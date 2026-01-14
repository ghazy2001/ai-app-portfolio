const express = require("express");
const router = express.Router();
const {
  trackVisit,
  getAnalytics,
} = require("../controllers/analyticsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/track", trackVisit);
router.get("/stats", protect, adminOnly, getAnalytics);

module.exports = router;
