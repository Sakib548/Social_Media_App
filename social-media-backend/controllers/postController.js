const Post = require("../models/Post");
const User = require("../models/User");
const crypto = require("crypto");

// Create a post
// exports.createPost = async (req, res) => {
//   const { content } = req.body;
//   console.log(req);
//   const post = new Post({
//     user: req.body.user,
//     content: req?.body?.content,
//     image: req?.file?.filename ? `uploads/posts/${req?.file?.filename}` : null,
//   });
//   console.log("Post", post);
//   try {
//     //await post.save();
//     res.json(post);
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// };

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const imagePath = req.file ? "/uploads/" + req.file.filename : null;

  try {
    const post = new Post({
      user: req.body.user, // Assuming you have user authentication middleware
      content,
      image: imagePath,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.editPost = async (req, res) => {
  const { id, content } = req.body;
  const imagePath = req.file ? "/uploads/" + req.file.filename : null;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is authorized to edit this post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this post" });
    }

    // Update the post
    post.content = content;
    if (imagePath) {
      post.image = imagePath;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error("Error editing post:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
// Get all posts (for home page)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", [
      "username",
      "profilePicture",
    ]);
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get posts by a specific user (for profile page)
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate(
      "user",
      ["username", "profilePicture"]
    );
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = {
      user: req.user.id,
      content,
      createdAt: new Date(),
    };

    post.comments.unshift(comment);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
