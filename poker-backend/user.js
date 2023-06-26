const users = []
const newuser = []
var rooms = [];

const addUser = ({ id, username, room, scrumMaster, story}) => {
    //clean the data

    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //vlidate data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    //check for existing users
    const existingUser = users.find((user) => {
        return user.room == room && user.username == username
    })

    //validate username
    if (existingUser) {
        return {
            error: "username is unavailable"
        }
    }

    //create new room if scrum master
    if(scrumMaster){
        rooms.push(room);
        console.log("HOSTED A NEW ROOM ",rooms);
    }
    else{ //check if room exists
        if(rooms.includes(room)){
            //OK
        }
        else{
            return {
                error: "No such room exists"
            }
        }
    }

    story = 0; //default user story to 0

    //store user
    const user = { id, username, room, scrumMaster, story }
    users.push(user)
    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}

const getUserInRoom = (room) => {
    const usersInRoom = users.filter((user) => {
        return user.room === room
    })
    return usersInRoom;

}

const setUserStory = (name, room, story) => {
    console.log("UPDATING USER " + name + " IN ROOM " + room + " TO STORY POINT " + story)
    users.map((user, index) => {
        if(user.username == name && user.room == room){
            console.log("FOUND USER")
            user.story = story;
            return;
        }
    })
}

const getRooms = () => {
    return rooms;
}

const deleteRoom = (roomId) => {
    rooms.splice(rooms.indexOf(roomId), 1); //remove room from list of rooms
}

module.exports = {
    addUser, removeUser, getUser, getUserInRoom, getRooms, deleteRoom, setUserStory
}