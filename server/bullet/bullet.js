const Player = require('../player/player')

// ---------- Bullets ---------- 
module.exports = class Bullet{
  constructor(x, y, owner, angle){
    this.id = Math.random();
    this.x = x,
    this.y = y,
    this.owner = owner
    this.angle = angle;
    this.speedX = Math.cos(this.angle/180*Math.PI)*10;
    this.speedY = Math.sin(this.angle/180*Math.PI)*10;
    this.timer = 0
    this.remove = false
    this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
  }

  update(){
    this.updatePosition()
    this.checkCollision()
  }

  updatePosition(){
      if(this.timer++ > 100) this.remove = true
      this.x = this.x + this.speedX
      this.y = this.y + this.speedY
  }

  getDistance(point){
      return Math.sqrt(Math.pow(this.x - point.x,2) + Math.pow(this.y - point.y,2))
  }

  checkCollision(){
      for(let i in Player.list){
          let player = Player.list[i]
          if(this.getDistance(player) < 32 && this.owner !== player.id){
              //handle collision eg. hp--
              this.remove = true
          }
      }
  }
}