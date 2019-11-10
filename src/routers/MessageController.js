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

 
module.exports = router
