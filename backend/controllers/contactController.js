const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const contact = await Contact.create({
        name,
        email,
        message,
    });

    res.status(201).json(contact);
});

// @desc    Get contact messages
// @route   GET /api/contact
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

module.exports = {
    createContact,
    getContacts,
};
