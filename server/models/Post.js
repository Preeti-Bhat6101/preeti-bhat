const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chronicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chronicle",
      required: true,
    },
    chapterNumber: {
      type: Number,
      required: true,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
