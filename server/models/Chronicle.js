const mongoose = require("mongoose");

const chronicleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: String,
    totalPosts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chronicle", chronicleSchema);
