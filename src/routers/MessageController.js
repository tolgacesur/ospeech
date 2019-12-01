const express = require('express')
const router = express.Router()
const {Message} = require("../models/MessageModel")
const auth = require('../middleware/auth')
router.use((req, res, next) => {
    next()
})

router.post("/history", (req,res) => {
    Message.find({ $and:[ {deletedAt:null},{ roomId:req.body.key} ] }, (err, messages) => {
        if(err)
            return res.status(500).send({"message":err})
        res.status(200).send(messages)
    })
})

//  Get last 20 messages
router.post("/lastmsg",(req,res) => {
    Message.find({"roomId":req.body.key},(err, message) => {
            if(err)
               return console.log(err)
            return res.status(200).send(message.reverse())
        }).sort({createdAt:-1}).limit(20);
  
})

router.post("/clearhistory", (req,res) => {
    let dateNow = new Date(Date.now()).toISOString(); 
    Message.updateMany( { $and:[ {deletedAt:null},{ roomId:req.body.key} ] }, {"$set":{"deletedAt": dateNow}}, (err,update) => {
        if(err) 
            return res.status(402).send({"messages":err})
        res.status(200).send("succes")
    })
})

module.exports = router
