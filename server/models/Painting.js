const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      default: "",
    },
    fullDescription: {
      type: String,
      default: "",
    },
    medium: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Painting", paintingSchema);
