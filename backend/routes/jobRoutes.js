const express = require('express');
const router = express.Router();
const { getJobs, createJob, deleteJob } = require('../controllers/jobController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.post('/', protect, adminOnly, createJob);
router.delete('/:id', protect, adminOnly, deleteJob);

module.exports = router;
