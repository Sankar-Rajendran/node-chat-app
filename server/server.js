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

    socket.emit('newMessage', {
        from: 'sankar',
        text: 'Hey!!',
        createdAt: new Date()
    });


    socket.on('createMessage', (newMessage) => {
        console.log('newMessage', newMessage);
    })

});






server.listen(port, () => {
    console.log('App started listening on ' + port);
})


// console.log(__dirname + '/../public');
// console.log(publicPath);
