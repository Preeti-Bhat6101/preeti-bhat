const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// GET single post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "chronicle",
      "title",
    );
    if (!post || !post.published)
      return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create post (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update post (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE post (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
