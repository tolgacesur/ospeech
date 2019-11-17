const {Message} = require("../models/MessageModel")

 module.exports.addMessage = function(message) {
    let newMessage = new Message(message)
    newMessage.createdAt = new Date(Date.now());
    newMessage.save()
}
