const express = require('express');
const router = express.Router();
const {
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getBlogs).post(protect, adminOnly, upload.single('coverImage'), createBlog);
router.route('/:slug').get(getBlogBySlug);
router
    .route('/:id')
    .put(protect, adminOnly, upload.single('coverImage'), updateBlog)
    .delete(protect, adminOnly, deleteBlog);

module.exports = router;
