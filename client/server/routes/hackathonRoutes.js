const express =
  require("express");

const router =
  express.Router();

const hackathons =
  require("../data/hackathons");


/*
=====================================
GET HACKATHONS
=====================================
*/

router.get(
  "/",
  async (req, res) => {

    try {

      res.status(200).json(
        hackathons
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