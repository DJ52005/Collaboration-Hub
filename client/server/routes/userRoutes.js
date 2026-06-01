const express = require("express");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");


const router = express.Router();
const authMiddleware =
  require("../middleware/authMiddleware");


/*
=====================================
GET PROFILE
=====================================
*/

router.get(
"/profile",
protect,
async(req,res)=>{

try{

const user=
await User.findById(
req.user.id
).select("-password");

res.json(user);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);



/*
=====================================
UPDATE PROFILE
=====================================
*/

router.put(
"/profile",
protect,
async(req,res)=>{

try{

const updatedUser=
await User.findByIdAndUpdate(

req.user.id,

{

name:req.body.name,

college:req.body.college,

branch:req.body.branch,

year:req.body.year,

skills:req.body.skills,

interests:req.body.interests,

experience:req.body.experience,

github:req.body.github,

linkedin:req.body.linkedin,

portfolio:req.body.portfolio,

bio:req.body.bio,

},

{
new:true
}

).select("-password");


res.json(updatedUser);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);


/*
=====================================
GET LOGGED IN USER
=====================================
*/

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    try {

      const User =
        require("../models/User");

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);
/*
=====================================
GET ALL USERS
=====================================
*/

router.get(
  "/all",
  authMiddleware,
  async (req, res) => {

    try {

      const users = await User.find(
        {
          _id: {
            $ne: req.user.id,
          },
        }
      ).select("-password");

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;