const express = require("express");
const router = express.Router();
const Painting = require("../models/Painting");
const auth = require("../middleware/auth");

// GET all paintings
router.get("/", async (req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });
    res.json(paintings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create painting (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const painting = new Painting(req.body);
    await painting.save();
    res.status(201).json(painting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update painting (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const painting = await Painting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(painting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE painting (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Painting.findByIdAndDelete(req.params.id);
    res.json({ message: "Painting deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
