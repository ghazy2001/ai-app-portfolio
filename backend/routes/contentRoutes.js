const express = require('express');
const router = express.Router();
const { getContentBySection, updateContent } = require('../controllers/contentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/:section', getContentBySection);
router.put('/', protect, adminOnly, updateContent);

module.exports = router;
