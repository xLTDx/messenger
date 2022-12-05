const { json } = require('express');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(json())

io.sockets.on("connection", socket => {

    console.log("user", socket.id)

    // socket.on('chat message', (msg) => {
    //   io.emit('chat message', msg);
    // });


    socket.on("room", (room) => {
        socket.join(room);
        console.log("joined in " + room)

    })

    socket.on('chat', (data) => {
        
        console.log(data)

        const { message, room } = data;
        console.log(`msg: ${message.text}, room: ${room}`);
        io.to(room).emit('chat', message);

    })

});





server.listen(7153, () => {
    console.log('Server is OK');
});