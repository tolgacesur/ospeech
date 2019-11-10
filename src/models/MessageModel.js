const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    username: {type:String,required:true},
    message:{type:String,required:true},
    roomId:{type:String,required:true},
    createdAt:{type:Date,required:true},
    deletedAt:{type:Date,required:false}
})

exports.Message = mongoose.model("Message",MessageSchema)

