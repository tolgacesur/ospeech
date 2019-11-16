const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router()
const { User } = require("../models/UsersModel");
const {Room} = require("../models/RoomsModel");
var randomstring = require("randomstring");

router.use( (req, res, next) => {
    next()
})

// User Register End Point
router.post("/register", (req, res) => {
  // ToDo validete 
  console.log(req.body);
    User.findOne({ "email": req.body.email},(err, user) => {
      if(err){
          return res.status(400).send({"err":err});
      } 
      if (user) {
          return res.status(422).send({message: "User has registered!"})
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
              // Room name user id nin tekrar bir hashlenme ile ortaya çıkan bir id oluyor.
                let roomname = randomstring.generate(8);
                 let newsroom = {
									"name":roomname,
									"userId":user._id
								}
								let newroom = new Room(newsroom)
								
							return newroom.save( (err,room) => {
									if(err)
										return console.error(err)
                  let body = {
                    token: token
                  }
                  return res.send(body);
                })
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
                  email: user.email,
                  token: token
                }
                  return res.status(200).send(body);
              }
              else {
                return res.status(422).send({message: "The email address or password is incorrect. Please retry..."})
              }
            })
          }
        else
          return res.status(422).send({message: "The email address or password is incorrect. Please retry..."});
      })
});

module.exports = router;
