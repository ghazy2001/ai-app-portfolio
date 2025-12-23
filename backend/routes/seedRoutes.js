const express = require('express');
const router = express.Router();
const { seedData } = require('../controllers/seedController');

// POST /api/seed - Trigger database seeding
router.post('/', seedData);

module.exports = router;
