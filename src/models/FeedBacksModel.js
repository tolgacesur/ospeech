const mongoose = require("mongoose")

const FeedBacksSchema = new mongoose.Schema({
    email: {type:String, required:false},
    message: {type:String, required:true},
    room:{ type:mongoose.Schema.Types.ObjectId, required: true}
},
{ versionKey: false }
)

exports.FeedBacks = mongoose.model('FeedBacks', FeedBacksSchema)