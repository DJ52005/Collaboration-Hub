const express = require("express");

const Project = require("../models/Project");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PROJECT
router.post("/", protect, async (req, res) => {

  try {

    const {
      title,
      description,
      domain,
      techStack,
      teamSize,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      domain,
      techStack,
      teamSize,
      createdBy: req.user,
      teamMembers: [req.user],
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET ALL PROJECTS
router.get("/", protect, async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;