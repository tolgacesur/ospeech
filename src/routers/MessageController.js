const express = require('express')
const router = express.Router()
const {Message} = require("../models/MessageModel")

router.use((req, res, next) => {
    next()
})

router.get("/", (req,res) => {
    Message.find({}, (err, messages) => {
        if(err)
            return res.status(500).send({"message":err})
        res.status(200).send(messages)
    })
})

//  Get last ten messages
router.post("/lastmessages",(req,res) => {
    Message.find({"roomId":req.body.key},(err, message) => {
            if(err)
                return res.send(err);
            return res.send(message.reverse())
        }).sort({createdAt:-1}).limit(10);
  
})
module.exports = router
