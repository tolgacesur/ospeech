
var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const whitelist = ['http://localhost:3000', 'http://example2.com'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)

//       callback(new Error('Not allowed by CORS'));
//   }
// }

// app.use();
// mongoose.connect("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb");
var user = require('./src/routers/Users');
const port = 3000;

app.use('/user',user)
let roomId;
io.on('connection', function(socket){
    console.log("kim ",socket.id)
    socket.on('room', function(room) {
        socket.join(room);
        roomId = room;
    });
    socket.on('ospeech', function(msg){
        
        console.log(msg);
        io.sockets.in(roomId).emit('ospeech', msg);
    });
});


http.listen(port, () => console.log(`Example app listening on port ${port}!`))