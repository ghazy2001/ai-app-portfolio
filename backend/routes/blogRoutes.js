const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
} = require("../controllers/blogController");

const upload = require("../middleware/uploadMiddleware");

router.route("/").get(getBlogs).post(upload.single("coverImage"), createBlog);
router.route("/:slug").get(getBlogBySlug);
router
  .route("/:id")
  .put(upload.single("coverImage"), updateBlog)
  .delete(deleteBlog);

router.route("/:id/comment").post(addComment);

module.exports = router;
