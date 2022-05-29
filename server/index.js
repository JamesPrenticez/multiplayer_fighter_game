console.log("here")
import path from 'path'
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);

export const io1 = new Server(server, {});

let PORT = 3000

app.get("/", function(req, res){
  res.sendFile(path.resolve() + "/server/public/index.html" );
})

app.use(express.json())
app.use("/client", express.static(path + '/client'));
app.use(express.static(path + '/server/public'))

//Game Server Files
import "./game/player.js"
// 'C:\Users\prent\github\multiplayer_fighter_game\server\game\player'
// 'C:\Users\prent\github\multiplayer_fighter_game\server\game\player.js'
import "./game/bullets.js"
import "./game/auth.js"
//import "./game/sockets.js"

//Routes
// import * as users from './routes/users.js';
// console.log(users)
//app.use('/', users)

server.listen(PORT)
console.log("Server started on port: " + PORT)

// ---------- Socket ---------- 

let io = server
//console.log(server.io)
let SOCKET_LIST = {}

io.sockets.on("connection", (socket) => {
    socket.id = Math.random();
    console.log("Socket connected " + socket.id);
    SOCKET_LIST[socket.id] = socket;
    
    socket.on("login", (data) => {
		isValidPassword(data,function(res){
			if(res){
				Player.onConnect(socket);
				socket.emit('loginResponse',{success:true});
			} else {
				socket.emit('loginResponse',{success:false});			
			}
		});
    });

    socket.on("register", (data) => {
        isUsernameTaken(data,function(res){
			if(res){
				socket.emit('registrationResponse',{success:false});		
			} else {
				addUser(data,function(){
					socket.emit('registrationResponse',{success:true});					
				});
			}
		});		
    });

    socket.on("disconnect", () => {
        Player.onDisconnect(socket);
    });
    
    socket.on("sendMessage", (data) => {
        var playerName = ("" + socket.id).slice(2,7)
        for (var i in SOCKET_LIST){
            SOCKET_LIST[i].emit("recieveMessage", playerName + ": " + data)
        }
    });

    socket.on("sendCommand", (command) => {
        if (command === "help"){
            result = "We would love to help you - /players"
        }
        else if (command === "players"){
            result = "There are " + Object.keys(Player.list).length + " players online"
        } else {
            result = "Try /help for a list of commands"
        }
        socket.emit("recieveCommand", result)
    });
})

// For every player connected loop through SOCKETLIST and update there position
setInterval(function(){
    var pack = {
        player: Player.update(),   
        bullet: Bullet.update()
    }

    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i]
        socket.emit("newPositions", pack)
    }
}, 1000/25) //25 times per second FPS?