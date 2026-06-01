const express = require("express");

const Project =
  require("../models/Project");

const protect =
  require("../middleware/authMiddleware");

const router = express.Router();

/*
=====================================
CREATE PROJECT
=====================================
*/

router.post(
  "/",
  protect,
  async (req, res) => {

    try {

      const {

        title,
        description,
        domain,

        techStack,

        teamSize,

        githubLink,

        memberNames,

        isRecruiting,

        openPositions,

      } = req.body;

      const project =
        await Project.create({

          title,

          description,

          domain,

          techStack,

          teamSize,

          githubLink,

          memberNames,

          isRecruiting,

          openPositions,

          createdBy:
            req.user.id,

          teamMembers: [
            req.user.id,
          ],

        });

      const populatedProject =
        await Project.findById(
          project._id
        )
          .populate(
            "createdBy",
            "name email"
          )
          .populate(
            "teamMembers",
            "name email"
          );

      res.status(201).json(
        populatedProject
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

/*
=====================================
GET ALL PROJECTS
(EXPLORE PROJECTS)
=====================================
*/

router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const projects =
        await Project.find({
          createdBy: {
            $ne: req.user.id,
          },
        })
          .populate(
            "createdBy",
            "name email profilePic"
          )
          .populate(
            "teamMembers",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        projects
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

/*
=====================================
GET MY PROJECTS
=====================================
*/

router.get(
  "/my-projects",
  protect,
  async (req, res) => {

    try {

      const projects =
        await Project.find({
          createdBy:
            req.user.id,
        })
          .populate(
            "createdBy",
            "name email"
          )
          .populate(
            "teamMembers",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        projects
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

/*
=====================================
GET SINGLE PROJECT
=====================================
*/

router.get(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        )
          .populate(
            "createdBy",
            "name email profilePic"
          )
          .populate(
            "teamMembers",
            "name email"
          );

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });

      }

      res.status(200).json(
        project
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

/*
=====================================
DELETE PROJECT
=====================================
*/

router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });

      }

      if (
        project.createdBy.toString()
        !== req.user.id
      ) {

        return res.status(403).json({
          message:
            "Not authorized",
        });

      }

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Project deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

/*
=====================================
UPDATE PROJECT
=====================================
*/

router.put(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });

      }

      if (
        project.createdBy.toString()
        !== req.user.id
      ) {

        return res.status(403).json({
          message:
            "Not authorized",
        });

      }

      const updatedProject =
        await Project.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        )
          .populate(
            "createdBy",
            "name email"
          )
          .populate(
            "teamMembers",
            "name email"
          );

      res.json(
        updatedProject
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

module.exports = router;