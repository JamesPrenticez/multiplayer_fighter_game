var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = "30px Arial"

const socket = io();

//recieve from the server
socket.on("newPositions", function(data){
    ctx.clearRect(0,0,500,500)
    for(var i = 0; i < data.player.length; i++){
      ctx.fillStyle = 'black'
      ctx.fillText(data.player[i].number, data.player[i].x, data.player[i].y)
    }
    for(var i = 0; i < data.bullet.length; i++){
      ctx.fillStyle = data.bullet[i].color
      ctx.fillRect(data.bullet[i].x-5, data.bullet[i].y-5, 10,10)
    }
})

//send to the server
document.onkeydown = (event) => {
  if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: true}); // w
  else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: true}); // s
  else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: true}); // d
  else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: true}); // a
}
document.onkeyup = (event) => {
  if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: false}); // w
  else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: false}); // s
  else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: false}); // d
  else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: false}); // a
}