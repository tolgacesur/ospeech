const express = require('express');
const router = express.Router()
const { User} = require("../models/UsersModel");
const {Room} = require("../models/RoomsModel");

router.use( (req,res,next) => {
    next()
})

router.get("/app-data", (req, res) => {
     User.findOne({"_id":req.user._id}, (err, user) => {
        if(err)
          return  res.status(400).send(err);
        
          return Room.findOne({"userId":req.user._id}, (err,room) => {
            if(err)
                return res.status(400).send(err);
            let body = {
							"user": {
								"_id":user._id,
								"username":user.username,
								"email":user.email
							},
							"room": {
								"_id":room._id,
                "token":room.token
							}
            }
            return res.status(200).send(body);
          })
     })
})
module.exports = router;