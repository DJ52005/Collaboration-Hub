const express = require("express");

const router = express.Router();

const Message = require("../models/Message");

const authMiddleware = require("../middleware/authMiddleware");


/*
=====================================
SAVE MESSAGE
=====================================
*/

router.post(
  "/save",
  authMiddleware,
  async (req, res) => {

    try {

      const { project, content } = req.body;

      const message = await Message.create({
        project,
        sender: req.user.id,
        content,
      });

      const populatedMessage =
        await Message.findById(message._id)
          .populate("sender", "name");

      res.status(201).json(
        populatedMessage
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


/*
=====================================
GET PROJECT MESSAGES
=====================================
*/

router.get(
  "/:projectId",
  authMiddleware,
  async (req, res) => {

    try {

      const messages = await Message.find({
        project: req.params.projectId,
      })
        .populate("sender", "name")
        .sort({ createdAt: 1 });

      res.json(messages);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;