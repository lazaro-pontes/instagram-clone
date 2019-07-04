const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://lazaro:AMORes@cluster0-wtocj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload', 'resized')))
app.use(require('./routes'))

const port = 3003
server.listen(port)
console.log( `servidor ligado na porta: ${port}`)