const mongoose = require("mongoose")

const FeedBacksSchema = new mongoose.Schema({
    email: {type:String, required:false},
    message: {type:String, required:true},
    roomId:{ type:mongoose.Schema.Types.ObjectId, required: true}
})

exports.FeedBacks = mongoose.model('FeedBacks', FeedBacksSchema)