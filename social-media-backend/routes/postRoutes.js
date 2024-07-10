const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Create a post
//router.post("/", postController.createPost);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), postController.createPost);

// Get all posts (for home page)
router.get("/", postController.getAllPosts);

// Get posts by a specific user (for profile page)
router.get("/user/:userId", postController.getUserPosts);

// Comment on a post
router.post("/:postId/comment", postController.commentOnPost);

// Edit a post
router.patch("/:id", upload.single("image"), postController.editPost);

// Delete a post
router.delete("/:id", postController.deletePost);

module.exports = router;
