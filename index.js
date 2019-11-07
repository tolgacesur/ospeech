
var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = require('./src/router/Users');
const port = 3000;
app.use('/user',user)
let roomId;
io.on('connection', function(socket){
    socket.on('room', function(room) {
        socket.join(room);
        roomId = room;
    });
    socket.on('ospeach', function(msg){
        console.log(msg);
        io.sockets.in(roomId).emit('ospeach', msg);
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))