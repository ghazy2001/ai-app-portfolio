const express = require("express");
const router = express.Router();
const {
  getJobs,
  createJob,
  deleteJob,
} = require("../controllers/jobController");

const upload = require("../middleware/uploadMiddleware");

router.get("/", getJobs);
router.post("/", upload.single("image"), createJob);
router.delete("/:id", deleteJob);

module.exports = router;
