const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

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

module.exports = router;
