const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post("/register", async(req, res) => {
    const user = req.body;
    //check for unique username and email
    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})
  
    if (takenUsername || takenEmail) {
      res.json({message: "Username or email has already been taken"})
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password
      })
      dbUser.save()
      res.json({message: "Success"})
    }
  }
  )
  module.exports = router