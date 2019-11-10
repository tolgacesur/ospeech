const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    roomname :  {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required:true}
})
// ToDo: Validation
exports.Room =  mongoose.model('Room',RoomSchema)