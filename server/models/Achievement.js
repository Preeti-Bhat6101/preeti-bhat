const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Achievements",
        "Leadership & Impact",
        "Learning & Certifications",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: "",
    },
    certificateUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Achievement", achievementSchema);
