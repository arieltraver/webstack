const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router()

router.post('/login', (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({userName: userLoggingIn.username})
    .then(dbUser => {
        if (!dbUser) {
            return res.json({
                message:"Invalid username or password"
            })
        }
        bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
            if(isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if(err) return res.json({message:err})
                        return res.json({
                            message: "Success",
                            token: "Bearer" + token
                        })
                    }
                )
            } else {
                return res.json({
                    message: "Invalid Username or Password"
                })
            }
        })
    })
})