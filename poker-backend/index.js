const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUserInRoom, getRooms, deleteRoom, setUserStory } = require('./user')

const PORT = 5000;

app.use(cors())
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        credentials: false,
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log("A USER CONNECTED");

    socket.on("join", (data) => {
        console.log("SOCKET ON JOIN", data);
        const {error, user} = addUser({ id:socket.id, username: data.username, room: data.room, scrumMaster: data.scrumMaster, story: data.story})
        if(error){
            console.log("SOCKET JOIN ERROR ", error)
            return error;
        }

        console.log("USER `" + user.username + "` JOINING ROOM " + user.room);
        socket.join(user.room)
        socket.broadcast.to(user.room).emit("messageJoin",`${user.username} has joined the room!`)

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUserInRoom(user.room)
        })
    })

    socket.on("sendMessage", message => {
        io.to(message.room).emit("message", {
            message : message.message,
            roundStart: message.roundStart,
            room: message.room
        })
    })

    socket.on("updateStory", data => {
        setUserStory(data.username, data.room, data.story);
        console.log("SETTING USER STORY ",data);
        io.to(data.room).emit("roomData", {
            room: data.room,
            users: getUserInRoom(data.room),
            updateStory: true
        })
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        console.log(user.username + " DISCONNECTED ", user)
        if (user) {
            io.to(user.room).emit("messageLeave", `${user.username} has left`)

            if(user.scrumMaster){ //scrum master left room
                deleteRoom(user.room) //remove room from list of rooms
                io.to(user.room).emit("disband", `Scrum master has left the room, returning to lobby`);

                io.socketsLeave(user.room);
            }
            else{
                io.to(user.room).emit("roomData", {
                    room: user.room,
                    users: getUserInRoom(user.room)
                })
            }
        }
    })
})

app.get('/', (req, res) => {
    res.send('Server is up and running!')
})

app.post('/join', (req, res) => {
    console.log("REQUESTING TO JOIN ",req.body.session)
    if(!getRooms().includes(req.body.session)){
        res.send(JSON.stringify({
            status: 404,
            message: "Requested to join a non-existing room"
        }))
    }
    else{
        res.send(JSON.stringify({
            message: "Client requested to join room",
            session: req.body.session,
            name: req.body.name,
            status: 200
        }))
    }
})

app.post('/host', (req, res) => {
    res.send(JSON.stringify({
        message: "Successfuly request to host a room",
        session: req.body.session,
        name: req.body.name,
        master: req.body.name
    }))
})

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
})