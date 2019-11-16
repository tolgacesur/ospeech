const {Message} = require("../models/MessageModel")

 module.exports.addMessage = function(message) {
    console.log(message)
    let newMessage = new Message(message)
    newMessage.createdAt = new Date(Date.now());
    newMessage.save()

}
