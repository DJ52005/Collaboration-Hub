const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(
    {

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },


      /*
      =====================================
      ACADEMIC INFO
      =====================================
      */

      college: {
        type: String,
      },

      branch: {
        type: String,
      },

      year: {
        type: String,
      },


      /*
      =====================================
      PROFILE
      =====================================
      */

      bio: {
        type: String,
      },

      experience: {
        type: String,
      },


      /*
      =====================================
      SKILLS
      =====================================
      */

      skills: [
        {
          type: String,
        },
      ],

      interests: [
        {
          type: String,
        },
      ],


      /*
      =====================================
      SOCIAL LINKS
      =====================================
      */

      github: {
        type: String,
      },

      linkedin: {
        type: String,
      },

      portfolio: {
        type: String,
      },


      /*
      =====================================
      PROFILE IMAGE
      =====================================
      */

      profilePic: {
        type: String,
        default: "",
      },

    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "User",
    userSchema
  );