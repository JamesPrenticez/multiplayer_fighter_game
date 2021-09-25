// EXPRESS
var express = require("express");
var app = express();
var server = require("http").Server(app)
var PORT = 2000

app.get("/", function(req, res){
    res.sendFile(__dirname + "/client/index.html");
})

app.use("/client", express.static(__dirname + "/client"));

server.listen(PORT)

console.log("Server started on port: " + PORT)

// SOCKET.IO

var SOCKET_LIST = {};
var PLAYER_LIST = {};

class Entity {
    constructor(x = 250, y = 250, speedX = 0, speedY = 0, id = ""){
        this.x = x,
        this.y = y,
        this.speedX = speedX,
        this.speedY = speedY,
        this.id = id 
    }
    update(){
        this.updatePosition();
    }
    updatePosition(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

class Player extends Entity{
    constructor(name = "james", number = 1, pressingUp = false, pressingDown = false, pressingRight = false, pressingLeft = false){
        super()
        this.name = name
        this.number = number,
        this.pressingUp = pressingUp,
        this.pressingDown = pressingDown,
        this.pressingRight = pressingRight,
        this.pressingLeft = pressingLeft,
        this.maxSpeed = 10
    }
    updatePosition(){
        if(this.pressingUp) this.y -= this.maxSpeed 
        if(this.pressingDown) this.y += this.maxSpeed 
        if(this.pressingRight) this.x += this.maxSpeed 
        if(this.pressingLeft) this.x -= this.maxSpeed 
    }
}

var io = require("socket.io")(server, {});

io.sockets.on("connection", function(socket){
    socket.id = Math.random();
    console.log("Socket connected " + socket.id)
    SOCKET_LIST[socket.id] = socket;



    var playerNumber =  SOCKET_LIST.toString().indexOf(socket.id)
    var player = new Player(name = "bob", number = Math.floor(10 * Math.random()))
    //console.log(player)
    PLAYER_LIST[socket.id] = player

    socket.on("disconnect", function(){
        console.log("Socket disconnected " + socket.id)
        delete SOCKET_LIST[socket.id]
        delete PLAYER_LIST[socket.id]
    })

    socket.on("keyPress", function(data){
        if(data.inputId === "up") player.pressingUp = data.state;
        else if(data.inputId === "down") player.pressingDown = data.state;
        else if(data.inputId === "right") player.pressingRight = data.state;
        else if(data.inputId === "left") player.pressingLeft = data.state;
    })
})

// For every player connected loop through SOCKETLIST and update there position
setInterval(function(){
    var pack = [];
    for(var i in PLAYER_LIST){
            var player = PLAYER_LIST[i]
            player.updatePosition()
            pack.push({
                x: player.x,
                y: player.y,
                number: player.number
            })
        }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i]
        socket.emit("newPositions", pack)
    }
},1000/25);
