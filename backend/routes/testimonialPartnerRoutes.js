const express = require('express');
const router = express.Router();
const {
    getTestimonials, createTestimonial, deleteTestimonial, updateTestimonial,
    getPartners, createPartner, deletePartner, updatePartner
} = require('../controllers/testimonialPartnerController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Testimonials
router.route('/testimonial')
    .get(getTestimonials)
    .post(protect, adminOnly, createTestimonial);

router.route('/testimonial/:id')
    .delete(protect, adminOnly, deleteTestimonial)
    .put(protect, adminOnly, updateTestimonial);

// Partners
router.route('/partner')
    .get(getPartners)
    .post(protect, adminOnly, upload.single('image'), createPartner);

router.route('/partner/:id')
    .delete(protect, adminOnly, deletePartner)
    .put(protect, adminOnly, upload.single('image'), updatePartner);

module.exports = router;
