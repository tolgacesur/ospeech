const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router()
const { User } = require("../models/UsersModel");
const {Room} = require("../models/RoomsModel");
const randomstring = require("randomstring");

const accesTokenCookieName = 'ospeech_access_token';

router.use( (req, res, next) => {
    next()
})

// User Register End Point
router.post("/register", (req, res) => {
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
                let key = randomstring.generate(8);
                 let newsroom = {
									"key":key,
									"userId":user._id
								}
								let newroom = new Room(newsroom)
								
							return newroom.save( (err,room) => {
									if(err)
										return console.error(err)

                  res.cookie(accesTokenCookieName, token, { expires: new Date(Date.now() + 168 * 3600000), httpOnly: true })
                  return res.send({token});
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
                res.cookie(accesTokenCookieName, token, { expires: new Date(Date.now() + 168 * 3600000), httpOnly: true })
                return res.status(200).send({token});
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

router.get('/logout', function(req, res){
  res.cookie(accesTokenCookieName, '', {expires: new Date(0)});

  return res.send(null);
});

module.exports = router;
