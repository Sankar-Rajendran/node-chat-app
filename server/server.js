const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


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
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        })
        console.log('newMessage', newMessage);
    })

});






server.listen(port, () => {
    console.log('App started listening on ' + port);
})


// console.log(__dirname + '/../public');
// console.log(publicPath);
