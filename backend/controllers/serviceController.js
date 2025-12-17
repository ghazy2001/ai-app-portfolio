const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');

// @desc    Get services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find();
    res.status(200).json(services);
});

// @desc    Create service
// @route   POST /api/services
// @access  Private
const createService = asyncHandler(async (req, res) => {
    const { title, description, icon } = req.body;
    let image = '';

    if (req.file) {
        image = req.file.path;
    }

    if (!title || !description || !icon) {
        res.status(400);
        throw new Error('Please add all text fields');
    }

    const service = await Service.create({
        title,
        description,
        icon,
        image,
    });

    res.status(201).json(service);
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    const { title, description, icon } = req.body;
    const updatedData = { title, description, icon };

    if (req.file) {
        // Delete old image if exists
        if (service.image) {
             const oldPath = path.resolve(service.image);
             if(fs.existsSync(oldPath)) {
                 fs.unlinkSync(oldPath);
             }
        }
        updatedData.image = req.file.path;
    }

    const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
            new: true,
        }
    );

    res.status(200).json(updatedService);
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    if (service.image) {
         const oldPath = path.resolve(service.image);
         if(fs.existsSync(oldPath)) {
             fs.unlinkSync(oldPath);
         }
    }

    await service.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
};
