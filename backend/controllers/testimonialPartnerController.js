const asyncHandler = require('express-async-handler');
const { Testimonial, Partner } = require('../models/TestimonialAndPartner');
const fs = require('fs');
const path = require('path');

// --- Testimonials ---

// @desc Get testimonials
// @route GET /api/testimonial
const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
});

// @desc Create testimonial
// @route POST /api/testimonial
const createTestimonial = asyncHandler(async (req, res) => {
    const { name, title, text } = req.body;
    if (!name || !text) {
        res.status(400); throw new Error('Name and text are required');
    }
    const testimonial = await Testimonial.create({ name, title, text });
    res.status(201).json(testimonial);
});

// @desc Delete testimonial
// @route DELETE /api/testimonial/:id
const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
        res.status(404); throw new Error('Testimonial not found');
    }
    await testimonial.deleteOne();
    res.json({ id: req.params.id });
});


// --- Partners ---

// @desc Get partners
// @route GET /api/partner
const getPartners = asyncHandler(async (req, res) => {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
});

// @desc Create partner
// @route POST /api/partner
const createPartner = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400); throw new Error('Please upload an image');
    }
    const partner = await Partner.create({ image: req.file.path });
    res.status(201).json(partner);
});

// @desc Delete partner
// @route DELETE /api/partner/:id
const deletePartner = asyncHandler(async (req, res) => {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
        res.status(404); throw new Error('Partner not found');
    }
    
    // Delete image file
    if (partner.image) {
         const oldPath = path.resolve(partner.image);
         if(fs.existsSync(oldPath)) {
             fs.unlinkSync(oldPath);
         }
    }
    
    await partner.deleteOne();
    res.json({ id: req.params.id });
});

module.exports = {
    getTestimonials, createTestimonial, deleteTestimonial,
    getPartners, createPartner, deletePartner
};
