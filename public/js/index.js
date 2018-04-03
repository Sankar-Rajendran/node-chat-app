var socket = io();

socket.on('connect', () => {
    console.log('Connected to Server');
});


socket.on('disconnect', () => {
    console.log('Disconnected from Server');
});



socket.on('newMessage', (message) => {
    console.log("from:" + message.from)
    console.log('message came');
})
