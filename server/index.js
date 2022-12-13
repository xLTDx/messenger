import { json } from 'express';
import  express from 'express';
const app = express();
import http from "http"
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { addUser, getUsers, createDialog, dialogExists, getDialogId, addMessage, getMessage, getUsersFromDialog, getRecepient, getLastMessage, registration, login } from './post/post.js';
import { getOneUser } from './get/get.js';
import cors from 'cors'
import { loginValidation, registrationValidation } from './validation.js';

mongoose.connect('mongodb+srv://admin:UzjOmWIJ4N8Zj4VH@cluster0.p1dfo9b.mongodb.net/messenger?retryWrites=true&w=majority')
    .then(() => console.log("DB is Ok"))
    .catch((err) => console.log("DB is not Ok", err));


app.use(json())
app.use(cors())

// Routes

app.post("/addUser", addUser)
app.post("/getOneUser", getOneUser)
app.post("/createDialog", createDialog)
app.post("/dialogExists", dialogExists)
app.post("/getUsers", getUsers)
app.post("/getDialogId", getDialogId)
app.post("/addMessage", addMessage)
app.post("/getMessage", getMessage)
app.post("/getUsersFromDialog", getUsersFromDialog)
app.post("/getRecepient", getRecepient)
app.post("/getLastMessage", getLastMessage)
app.post("/registration", registrationValidation, registration)
app.post("/login", loginValidation, login) 

// Sockets


io.sockets.on("connection", socket => {

    console.log("user", socket.id)

    socket.on("dialogId", (dialogId) => {
        
        socket.join(dialogId);

        console.log("room: " + dialogId)

        console.log( socket.rooms)


    })


    socket.on('chat', (data) => {
        
        console.log(data)
        console.log("to " + data.dialogId)
        io.to(data.dialogId).emit('chat', data);

        // io.emit('chat', data);

    })

});

server.listen(7153, () => {
    console.log('Server is OK');
});