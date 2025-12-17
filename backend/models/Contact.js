const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: false
    },
    interests: {
        type: [String],
        required: false
    },
    referral: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
