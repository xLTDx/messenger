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
    
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  

    // socket.on("room", (room) => {
    //     socket.join(room);
    //     console.log("joined in " + room)
    // })
    
  });

  



server.listen(7153, () => {
  console.log('Server is OK');
});