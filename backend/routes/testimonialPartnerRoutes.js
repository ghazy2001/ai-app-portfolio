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
    .post(createTestimonial);

router.route('/testimonial/:id')
    .delete(deleteTestimonial)
    .put(updateTestimonial);

// Partners
router.route('/partner')
    .get(getPartners)
    .post(upload.single('image'), createPartner);

router.route('/partner/:id')
    .delete(deletePartner)
    .put(upload.single('image'), updatePartner);

module.exports = router;
