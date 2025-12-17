const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// @desc    Get projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    let images = [];

    if (req.files) {
        req.files.map((file) => {
            images.push(file.path);
        });
    }

    if (!title || !description) {
        res.status(400);
        throw new Error('Please add all text fields');
    }

    const project = await Project.create({
        title,
        description,
        images,
    });

    res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    const { title, description } = req.body;
    const updatedData = { title, description };

    if (req.files && req.files.length > 0) {
        // Delete old images
        if (project.images && project.images.length > 0) {
            project.images.forEach((imgPath) => {
                 const oldPath = path.resolve(imgPath);
                 if(fs.existsSync(oldPath)) {
                     fs.unlinkSync(oldPath);
                 }
            });
        }
        
        let images = [];
        req.files.map((file) => {
            images.push(file.path);
        });
        updatedData.images = images;
    }

    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
            new: true,
        }
    );

    res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    if (project.images && project.images.length > 0) {
        project.images.forEach((imgPath) => {
             const oldPath = path.resolve(imgPath);
             if(fs.existsSync(oldPath)) {
                 fs.unlinkSync(oldPath);
             }
        });
    }

    await project.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
