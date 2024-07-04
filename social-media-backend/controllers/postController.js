const Post = require("../models/Post");
const User = require("../models/User");

// Create a post
exports.createPost = async (req, res) => {
  const { content } = req.body;
  const post = new Post({
    user: req.user.id,
    content,
  });

  try {
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.editPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send("Server error");
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
