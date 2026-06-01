const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
      default: [],
    },

    teamSize: {
      type: Number,
      required: true,
    },

    githubLink: {
      type: String,
      default: "",
    },

    // NEW
    memberNames: [
      {
        type: String,
      },
    ],

    // NEW
    isRecruiting: {
      type: Boolean,
      default: true,
    },

    // NEW
    openPositions: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);