const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, message, budget, interests, referral } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Save to Database
    const contact = await Contact.create({
        name,
        email,
        message,
        budget,
        interests,
        referral
    });

    // Send Email
    try {
        console.log('Attempting to send email...');
        console.log('USER:', process.env.EMAIL_USER ? 'Set' : 'Not Set');
        console.log('PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your app password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'mahmoudghazy2001@gmail.com', // Receiver
            subject: `New Contact Request from ${name}`,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
                <p><strong>Referral:</strong> ${referral || 'Not specified'}</p>
                <p><strong>Interests:</strong> ${interests && interests.length > 0 ? interests.join(', ') : 'None'}</p>
                <h3>Message:</h3>
                <p>${message}</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(201).json({ ...contact.toObject(), emailSent: true });

    } catch (error) {
        console.error('Email send failed:', error);
        // Return 201 but with a warning field in JSON
        res.status(201).json({ ...contact.toObject(), emailSent: false, emailError: error.message });
    }
});

// @desc    Get contact messages
// @route   GET /api/contact
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
});

module.exports = {
    createContact,
    getContacts,
};
