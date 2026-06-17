const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");
const auth = require("../middleware/auth");

// GET all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create achievement (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update achievement (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(achievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE achievement (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
