const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String },         // Optional job title
    text: { type: String, required: true },
}, { timestamps: true });

const partnerSchema = mongoose.Schema({
    image: { type: String, required: true }, // URL to logo
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Partner = mongoose.model('Partner', partnerSchema);

module.exports = { Testimonial, Partner };
