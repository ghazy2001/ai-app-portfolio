const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

// @desc    Get blogs
// @route   GET /api/blog
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

// @desc    Get blog by slug or ID
// @route   GET /api/blog/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  let blog;

  // Check if input is a valid ObjectId
  if (slug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findById(slug);
  } else {
    blog = await Blog.findOne({ slug });
  }

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.status(200).json(blog);
});

// @desc    Create blog
// @route   POST /api/blog
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, slug, content } = req.body;
  let coverImage = "";

  if (req.file) {
    coverImage = req.file.path;
  }

  if (!title || !slug || !content || !coverImage) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const blog = await Blog.create({
    title,
    slug,
    content,
    coverImage,
  });

  res.status(201).json(blog);
});

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const { title, slug, content } = req.body;
  const updatedData = { title, slug, content };

  if (req.file) {
    if (blog.coverImage) {
      const oldPath = path.resolve(blog.coverImage);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    updatedData.coverImage = req.file.path;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.coverImage) {
    const oldPath = path.resolve(blog.coverImage);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  await blog.deleteOne();

  res.status(200).json({ id: req.params.id });
});

// @desc    Add comment to blog
// @route   POST /api/blog/:id/comment
// @access  Public
const addComment = asyncHandler(async (req, res) => {
  const { name, text } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (!name || !text) {
    res.status(400);
    throw new Error("Please provide name and comment text");
  }

  const comment = { name, text, date: Date.now() };

  blog.comments.push(comment);
  await blog.save();

  res.status(201).json(blog.comments);
});

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
};
