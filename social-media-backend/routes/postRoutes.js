const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

const router = express.Router();

// Create a post
router.post("/", postController.createPost);

// Get all posts (for home page)
router.get("/", postController.getAllPosts);

// Get posts by a specific user (for profile page)
router.get("/user/:userId", postController.getUserPosts);

// Comment on a post
router.post("/:postId/comment", postController.commentOnPost);

// Edit a post
router.put("/:postId", postController.editPost);

// Delete a post
router.delete("/:postId", postController.deletePost);

module.exports = router;
