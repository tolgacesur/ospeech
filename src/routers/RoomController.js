const express = require('express')
const router = express.Router()
const {Room} = require("../models/RoomsModel");
const {User} = require("../models/UsersModel")

router.use((req, res, next) => {
    next()
})
// Room create 
router.post("/create", (req,res) => {

    User.findById( req.user._id, (err,user) => {
        if(err) 
            return res.status(500).send({"Message":err})
        if(user) {
            req.body.userId = req.user._id
            let newroom = new Room(req.body)
            newroom.save((err,room) => {
                if(err)
                    return res.status(500).send(err)
                  delete room._id
                 res.status(200).send(room)
            })
        } else
            res.status(401).send({"Message":"Wrong proces"})
    })
})
// Room list
router.get("/", (req,res) => {
    Room.find({}, (err,rooms) => {
        if(err) 
            return res.status(500).send({"Message":err})
        if(rooms)
            res.status(200).send(rooms)
    })
})


module.exports = router;