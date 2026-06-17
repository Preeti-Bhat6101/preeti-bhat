const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      default: "",
    },
    whatIBuilt: {
      type: String,
      default: "",
    },
    results: {
      type: String,
      default: "",
    },
    myRole: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Not Deployed", "Archived"],
      default: "Completed",
    },
    technologies: [String],
    githubLink: String,
    demoLink: String,
    screenshots: [String],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
