const express = require("express");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// UPDATE PROFILE
router.put("/profile", protect, async (req, res) => {

  try {

    const {
      bio,
      skills,
      github,
      profilePic,
    } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.github = github || user.github;
    user.profilePic = profilePic || user.profilePic;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


module.exports = router;