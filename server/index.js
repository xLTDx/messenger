import { json } from 'express';
import  express from 'express';
const app = express();
import http from "http"
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { addUser } from './post/post.js';
import { getOneUser, getUsers } from './get/get.js';
import cors from 'cors'

mongoose.connect('mongodb+srv://admin:UzjOmWIJ4N8Zj4VH@cluster0.p1dfo9b.mongodb.net/messenger?retryWrites=true&w=majority')
    .then(() => console.log("DB is Ok"))
    .catch((err) => console.log("DB is not Ok", err));


app.use(json())
app.use(cors())
// Routes

app.post("/addUser", addUser)
app.post("/getOneUser", getOneUser)

app.get("/getUsers", getUsers)

// Sockets

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