const express = require('express')
const router = express.Router()
const {FeedBacks} = require("../models/FeedBacksModel")
const auth = require("../middleware/auth")
router.use( (req, res, next)  => {
    next()
})

router.post("/send", (req,res) => {
    let newFeedBack = new FeedBacks(req.body)
    return newFeedBack.save((err,feedBack) => {
        if(err) 
           return res.status(500).send({"message":err})
        if(feedBack){
            res.status(200).send({"message":"Succes"})
        }
    })
})

router.get("/", auth.verifyUser, (req,res) => {
    FeedBacks.find({}, (err,feedbacks) => {
        if(err)
           return res.status(500).send({"message":err})
        res.status(200).send(feedbacks)
    })
})

module.exports = router;