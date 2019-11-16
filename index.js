
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
const path = require('path')
const config = require('./config.js')
const auth = require('./src/middleware/auth')
const socketService = require("./src/services/SocketService")
const cors = require('cors')
const cookieParser = require('cookie-parser')

// DB connection
mongoose.connect(config.dburi, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true }, err => console.log(err ? err : 'Mongo connected.'))
app.use(cookieParser())
app.use(express.json())
app.use(cors())

// Routers
const user = require('./src/routers/UsersController')
const feedbacks = require('./src/routers/FeedBacksController')
const message = require('./src/routers/MessageController')
const api = require('./src/routers/AppController')
const welcome = require('./src/routers/WelcomeController')

app.use('/user',user)
app.use('/api', auth.verifyUser, api)
app.use('/feedbacks',feedbacks)
app.use('/message', auth.verifyUser, message)
app.use('/', auth.checkCookie, welcome)

// Public Files
app.use('/dashboard', express.static(path.join(__dirname, 'public/dashboard')))
app.use('/client', express.static(path.join(__dirname, 'public/client')))
app.use('/', express.static(path.join(__dirname, 'public/landing')))

// Socket Services
socketService.socketConnection(io);

global.__basedir = __dirname;

http.listen(config.port, () => console.log(`Application listening on port ${config.port}!`))