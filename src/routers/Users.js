const express = require('express');
const bc = require('bcrypt');
const router = express.Router()
const { User, validate } = require("../models/Users");
const auth = require('../middleware/auth')

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get("/", auth, async (req, res) => {
  const user = User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/add", async (req, res) => {
  // validate the request body first
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let user = User.findOne({ email: req.body.email });
  // console.log(user)
  // if (user && user != undefined) return res.status(400).send("User already registered.");

  user = new User(req.body);
  user.password = await bc.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email
  });
})

module.exports = router;
