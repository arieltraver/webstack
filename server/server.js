//https://www.mongodb.com/languages/mern-stack-tutorial
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.get("/getUserName", verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, username: req.user.username })
})

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]
  if(token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "failed to authenticate",
      })
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next()
    })
  } else {
    res.json({message:"Incorrect Token Given", isLoggedIn: false})
  }
}