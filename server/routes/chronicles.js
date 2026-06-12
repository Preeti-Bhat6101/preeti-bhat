const express = require("express");
const router = express.Router();
const Chronicle = require("../models/Chronicle");
const Post = require("../models/Post");

// GET all chronicles
router.get("/", async (req, res) => {
  try {
    const chronicles = await Chronicle.find().sort({ createdAt: -1 });
    res.json(chronicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single chronicle with its posts
router.get("/:id", async (req, res) => {
  try {
    const chronicle = await Chronicle.findById(req.params.id);
    if (!chronicle)
      return res.status(404).json({ message: "Chronicle not found" });
    const posts = await Post.find({
      chronicle: req.params.id,
      published: true,
    }).sort({ chapterNumber: 1 });
    res.json({ chronicle, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
