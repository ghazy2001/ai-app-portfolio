const express = require("express");
const router = express.Router();
const {
  trackVisit,
  getAnalytics,
  identifyVisitor,
  resetAnalytics,
} = require("../controllers/analyticsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/track", trackVisit);
router.post("/identify", identifyVisitor);
router.get("/stats", protect, adminOnly, getAnalytics);
router.delete("/reset", protect, adminOnly, resetAnalytics);

module.exports = router;
