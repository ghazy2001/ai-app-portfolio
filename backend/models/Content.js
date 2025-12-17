const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    section: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Compound index to ensure unique key per section
contentSchema.index({ section: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);
