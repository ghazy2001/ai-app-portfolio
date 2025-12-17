const asyncHandler = require('express-async-handler');
const Content = require('../models/Content');

// @desc    Get content by section
// @route   GET /api/content/:section
// @access  Public
const getContentBySection = asyncHandler(async (req, res) => {
    const { section } = req.params;
    const content = await Content.find({ section });
    
    // Transform array to object for easier frontend usage
    // { "title": "Some value", "subtitle": "..." }
    const contentMap = {};
    content.forEach(item => {
        contentMap[item.key] = item.value;
    });

    res.status(200).json(contentMap);
});

// @desc    Update content
// @route   PUT /api/content
// @access  Private/Admin
const updateContent = asyncHandler(async (req, res) => {
    const { section, key, value } = req.body;

    if (!section || !key || value === undefined) {
        res.status(400);
        throw new Error('Please provide section, key, and value');
    }

    const content = await Content.findOneAndUpdate(
        { section, key },
        { value },
        { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json(content);
});

module.exports = {
    getContentBySection,
    updateContent,
};
