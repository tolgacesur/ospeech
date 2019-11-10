const express = require('express')
const router = express.Router()
const FeedBacks = require("../models/FeedBacks")
const auth = require("./src/middleware/auth")
router.use( (req, res, next)  => {
    next()
})

router.post("/create", (req,res) => {

    let newFeedBack = new FeedBacks(req.body)
    newFeedBack.save((err,feedBack) => {
        if(err) 
            res.status(500).send({"message":err})
        if(feedBack){
            res.status(200).send({"message":"Succes"})
        }
    })
})

router.get("/", auth.verifyUser, (req,res) => {
    FeedBacks.find({}, (err,feedbacks) => {
        if(err)
            res.status(500).send({"message":err})
        res.status(200).send(feedbacks)
    })
})

module.exports = router;