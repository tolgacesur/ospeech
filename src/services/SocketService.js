const msgsave = require('./MessageSaveService')
const {Room} = require("../models/RoomsModel");
/**
 * Socket 
 * Two subscribe socket channel 'room' and ospeach
 */

module.exports.socketConnection = function(io) {
    let msgEmitFlag = false;
    io.on('connection', function(socket){
        socket.on('join-room', function(room) {
            roomValidate(room, (succes) => {
                if(succes){
                    socket.join(room)
                    msgEmitFlag = true;
                }   
            })
        });
        socket.on('send-message', function(msg){
            if(msg.message !=="" && msgEmitFlag){
                io.sockets.in(msg.roomId).emit('message-received', msg)
                msgsave.addMessage(msg)
            }
        });
    });
}

function roomValidate ( room, cb) {
    Room.findOne({'key': room.toString()}, (err, findroom) => {
        if(findroom)
            return cb(true);
        else
            return cb(false);
    })
}
    
