const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = async (req, res) => {
    const { title, location, type, description } = req.body;
    if (!title || !location || !type || !description) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const job = await Job.create({ title, location, type, description });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access Private/Admin
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job) {
             return res.status(404).json({message: 'Job not found'});
        }
        await job.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

module.exports = { getJobs, createJob, deleteJob };
