const express = require('express')
const router = express.Router()
const {Message} = require("../models/MessageModel")
const auth = require('../middleware/auth')
router.use((req, res, next) => {
    next()
})

router.get("/",auth.verifyUser, (req,res) => {
    Message.find({}, (err, messages) => {
        if(err)
            return res.status(500).send({"message":err})
        res.status(200).send(messages)
    })
})

//  Get last ten messages
router.post("/lastmsg",(req,res) => {
    console.log(req.body)
    Message.find({"roomId":req.body.key},(err, message) => {
            if(err)
               return console.log(err)
            return res.status(200).send(message.reverse())
        }).sort({createdAt:-1}).limit(10);
  
})
module.exports = router
