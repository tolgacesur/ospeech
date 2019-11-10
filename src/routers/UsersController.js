const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router()
const { User,validate } = require("../models/UsersModel");
const auth = require('../middleware/auth')
const config = require('../../config')

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// User Register End Point
router.post("/register", (req, res) => {
  // ToDo validete 
    User.findOne({ "email": req.body.email},(err, user) => {
      if(err){
          return res.status(400).send({"err":err});
      } 
      if (user)
      {
          return res.status(401).send({"Message":"User has registered!"})
      }
      else
      {
        let newuser = new User(req.body);  
        bcrypt.hash(newuser.password, 10, (err, hash) => {
           if(err)
            return res.status(500).send({"error":error})
          if(hash){
            newuser.password = hash;
            const token = newuser.generateAuthToken();
            return newuser.save( (err,user) => {
              if(err)
                return res.status(500).send({"error":err})
  
              let body = {
                username : user.username,
                email: user.email
              }
              return res.header("x-auth-token", token).send(body);
            })
          }
        })
      }   
    })
  })

// User Login
router.post("/login", (req, res) => {
    User.findOne({'email':req.body.email}, (err, user) => {
        if(err) 
          return res.status(400).send({'err':err})
        if(user){
          bcrypt.compare(req.body.password, user.password, function(err, response) {
            if(err)
              return res.status(500).send({"error":err})
            if(response){
                let token = user.generateAuthToken();
                let body = {
                  username : user.username,
                  email: user.email
                }
                  res.setHeader("x-auth-token", token);
                  return res.status(200).send(body);
              }
              else {
                return res.status(401).send({"Message":"The email address or password is incorrect. Please retry..."})
              }
            })
          }
        else
          return res.status(401).send({"Message":"The email address or password is incorrect. Please retry..."});
      })
});

module.exports = router;
