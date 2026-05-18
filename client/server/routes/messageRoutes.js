const express = require("express");

const Message = require("../models/Message");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// GET PROJECT MESSAGES
router.get("/:projectId", protect, async (req, res) => {

  try {

    const messages = await Message.find({
      project: req.params.projectId,
    })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});
// SAVE MESSAGE
router.post("/save", protect, async (req, res) => {

  try {

    const { project, content } = req.body;

    const message = await Message.create({
      sender: req.user,
      project,
      content,
    });

    res.status(201).json(message);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;