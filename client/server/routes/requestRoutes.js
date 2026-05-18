const express = require("express");

const Request = require("../models/Request");
const Project = require("../models/Project");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// SEND JOIN REQUEST
router.post("/:projectId", protect, async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.projectId
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Prevent duplicate requests
    const existingRequest = await Request.findOne({
      sender: req.user,
      project: project._id,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    // Prevent creator requesting own project
    if (
      project.createdBy.toString() === req.user
    ) {
      return res.status(400).json({
        message: "You own this project",
      });
    }

    const request = await Request.create({
      sender: req.user,
      receiver: project.createdBy,
      project: project._id,
    });

    res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET RECEIVED REQUESTS
router.get("/", protect, async (req, res) => {

  try {

    const requests = await Request.find({
      receiver: req.user,
      status: "Pending",
    })
      .populate("sender", "name email profilePic")
      .populate("project", "title");

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// ACCEPT REQUEST
router.put("/accept/:requestId", protect, async (req, res) => {

  try {

    const request = await Request.findById(
      req.params.requestId
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Accepted";

    await request.save();

    // Add member to project
    const project = await Project.findById(
      request.project
    );

    if (
      !project.teamMembers.includes(
        request.sender
      )
    ) {
      project.teamMembers.push(request.sender);

      await project.save();
    }

    res.status(200).json({
      message: "Request accepted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// REJECT REQUEST
router.put("/reject/:requestId", protect, async (req, res) => {

  try {

    const request = await Request.findById(
      req.params.requestId
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      message: "Request rejected",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;