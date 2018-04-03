const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });


    //Socket.emit - will emit to one connection
    //io.emit - will emit to all the connections- broadcasting


    socket.on('createMessage', (newMessage) => {
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text))
        console.log('newMessage', newMessage);
    });

    //Greeding individual user
    socket.emit('newMessage', generateMessage('Admin','Welcome to this chat room'));

    //Broadcase to all
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

});






server.listen(port, () => {
    console.log('App started listening on ' + port);
})


// console.log(__dirname + '/../public');
// console.log(publicPath);
