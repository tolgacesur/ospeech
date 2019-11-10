const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('../../config')

const RoomSchema = new mongoose.Schema({
    roomname :  {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required:true}
})
// ToDo: Validation
const Room = mongoose.model('Room',RoomSchema)
exports.Room = Room;