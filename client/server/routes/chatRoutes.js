const express = require("express");

const router = express.Router();

const Conversation = require("../models/Conversation");

const Message = require("../models/Message");

const authMiddleware = require("../middleware/authMiddleware");

/*
=====================================
GET CONVERSATIONS
=====================================
*/

router.get(
  "/conversations",
  authMiddleware,
  async (req, res) => {
    try {
      const conversations =
        await Conversation.find({
          participants: req.user.id,
        })
          .populate(
            "participants",
            "name email"
          )
          .sort({ updatedAt: -1 });

      res.json(conversations);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/*
=====================================
CREATE CONVERSATION
=====================================
*/

router.post(
  "/conversation",
  authMiddleware,
  async (req, res) => {

    try {

      const { userId } = req.body;

      // VALIDATION

      if (!userId) {
        return res.status(400).json({
          message: "User ID required",
        });
      }

      // PREVENT SELF CHAT

      if (req.user.id === userId) {
        return res.status(400).json({
          message:
            "You cannot chat with yourself",
        });
      }

      // CHECK EXISTING CONVERSATION

      const existingConversation =
        await Conversation.findOne({
          participants: {
            $all: [
              req.user.id,
              userId,
            ],
          },
        }).populate(
          "participants",
          "name email"
        );

      if (existingConversation) {
        return res.json(
          existingConversation
        );
      }

      // CREATE NEW CONVERSATION

      const conversation =
        await Conversation.create({
          participants: [
            req.user.id,
            userId,
          ],
        });

      // POPULATE PARTICIPANTS

      const populatedConversation =
        await Conversation.findById(
          conversation._id
        ).populate(
          "participants",
          "name email"
        );

      res.status(201).json(
        populatedConversation
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
GET MESSAGES
=====================================
*/

router.get(
  "/messages/:conversationId",
  authMiddleware,
  async (req, res) => {

    try {

      const messages =
        await Message.find({
          conversationId:
            req.params.conversationId,
        })
          .populate(
            "sender",
            "name"
          )
          .sort({ createdAt: 1 });

      res.json(messages);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

/*
=====================================
SEND MESSAGE
=====================================
*/

router.post(
  "/message",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        conversationId,
        content,
      } = req.body;

      const message =
        await Message.create({
          conversationId,
          sender: req.user.id,
          content,
        });

      await Conversation.findByIdAndUpdate(
        conversationId,
        {
          lastMessage: content,
        }
      );

      const populatedMessage =
        await Message.findById(
          message._id
        ).populate(
          "sender",
          "name"
        );

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
DELETE CONVERSATION
=====================================
*/

router.delete(
  "/conversation/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Conversation.findByIdAndDelete(
        req.params.id
      );

      await Message.deleteMany({
        conversationId:
          req.params.id,
      });

      res.json({
        message:
          "Conversation deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;