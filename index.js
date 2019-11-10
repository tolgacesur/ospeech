
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('./config.js')
const auth = require('./src/middleware/auth')
// DB connection
mongoose.connect(config.dburi, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true }, err => console.log(err ? err : 'Mongo connected.'))
app.use(express.json())
// Routers
const user = require('./src/routers/UsersController')
const room = require('./src/routers/RoomController')
const feedbacks = require('./src/routers/FeedBacksController')
const message = require('./src/routers/MessageController')
const msgsave = require('./src/routers/MessageSave')
app.use('/user',user)
app.use('/room',auth.verifyUser, room)
app.use('/feedbacks',feedbacks)
app.use('/message', auth.verifyUser, message)

app.use('/dashboard', express.static(path.join(__dirname, 'public/dashboard')))
app.use('/client', express.static(path.join(__dirname, 'public/client')));
app.use('/', express.static(path.join(__dirname, 'public/landing')))

/**
 * Socket 
 * Two subscribe socket channel 'room' and ospeach
 */
io.on('connection', function(socket){
    socket.on('join-room', function(room) {
        socket.join(room)
    });
    socket.on('send-message', function(msg){
        if(msg.message !==""){
            io.sockets.in(msg.roomId).emit('message-received', msg)
            msgsave.addMessage(msg)
        }
    });
});

http.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))