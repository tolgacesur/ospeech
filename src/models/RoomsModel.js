const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name :  {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required:true}
},
{ versionKey: false }
)
// ToDo: Validation
exports.Room =  mongoose.model('Room',RoomSchema)