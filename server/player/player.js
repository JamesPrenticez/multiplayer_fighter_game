const Bullet = require('../bullet/bullet.js')


// let canvas = document.getElementById('canvas');
// canvas.width = 800;
// canvas.height = 800;
// var ctx = canvas.getContext("2d");

let canvasX = 500
let canvasY = 500

// ---------- PLayer ---------- 
module.exports = class Player{
  constructor(id, username, number = 1,){
      this.id = id
      this.username = username
      this.number = number,
      this.x = 250,
      this.y = 250,
      this.w = 50,
      this.h = 50,
      this.r = 25,
      this.pressingUp = false,
      this.pressingDown = false,
      this.pressingRight = false,
      this.pressingLeft = false,
      this.pressingAttack = false,
      this.cooldown = false,
      this.clientX = 250,
      this.clientY = 250,
      this.maxSpeed = 20
  }

  update(){
      this.updatePosition()
      this.shootBullet()
  }

  updatePosition(){
      // Increase/decrease x/y coordinates
      if(this.pressingLeft) this.x -= this.maxSpeed 
      if(this.pressingRight) this.x += this.maxSpeed 
      if(this.pressingUp) this.y -= this.maxSpeed
      if(this.pressingDown) this.y += this.maxSpeed 

      // Keep within canvas bounds
      if (this.x - this.r < 0.0) { this.x = this.r;} // Left boundary: x:0
      if (this.x + this.r > canvasX) {this.x = canvasX - this.r} // Right boundary: x:500
      if (this.y - this.r < 0.0) { this.y = this.r } // Top boundary: y:0
      if (this.y + this.r > canvasY) { this.y = canvasY - this.r } // Bottom boundary: y:500
  }

  shootBullet(){
      if (this.pressingAttack === true && this.cooldown === false) {
          let angle = Math.atan2(
              this.clientY - this.y,
              this.clientX - this.x
          ) / Math.PI * 180

          let bullet = new Bullet(this.x, this.y, this.id, angle)
          Bullet.list[bullet.id] = bullet

          this.cooldown = true;
          setTimeout(() => this.cooldown = false, 300);
      }
  }
}