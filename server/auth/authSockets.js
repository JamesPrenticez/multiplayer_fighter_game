const { isUsernameTaken, createNewAccount, getWallet } = require("./auth.js")

function listen(io){
  io.on("connect", (socket) => {
    socket.on("createNewAccount", (data) => {
      isUsernameTaken(data, function(res){
          if(res){
            socket.emit('createNewAccountResponse', {success: false})		
          } else {
            createNewAccount(data, function(){
                socket.emit('createNewAccountResponse', {success: true})				
            })
          }
      })		
    })
    socket.on("isUsernameTaken", (data) => {
      isUsernameTaken(data, function(res){
          if(res){
              socket.emit('isUsernameTakenResponse', {success: true})		
            } else {
              socket.emit('isUsernameTakenResponse', {success: false})				
          }
      })		
    })
    socket.on("getWallet", (data) => {
      getWallet(data, function(res){
        console.log("get wallet", res)
          if(res){
              socket.emit('getWalletResponse', {success: true, username: res.username})		
            } else {
              socket.emit('getWalletResponse', {success: false})				
          }
      })		
    })
  })
}

module.exports = {
  listen,
}