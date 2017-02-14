const Bird = function(x, y, ctx){
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.velY = 0;
  this.width = 90;
  this.height = 64;
  this.ticks = 0;
  this.spriteIndex = 0;
  this.dead = false;
  this.sprites = [document.getElementById('bird1'),
        document.getElementById('bird2'),
        document.getElementById('bird3')];
  var self = this;
  window.addEventListener('keydown', function(e){
    if (e.keyCode === 32 && !self.dead){
      self.velY = -16;
    }
  });
};
Bird.prototype.update = function(pipes){
  this.y += this.velY;
  this.velY += 1.25;
  if (this.detectCollisions(pipes)){
    this.dead = true;
  }

  this.ticks++;
  if (this.ticks % 15 === 0) this.spriteIndex = (this.spriteIndex+1) % this.sprites.length;

};

Bird.prototype.render = function(){
  let renderX = - this.width/2;
  let renderY = - this.height/2;
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  let angle = Math.PI/6 * this.velY/16;
  this.ctx.rotate(angle);
  this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);

  this.ctx.restore();
};

Bird.prototype.detectCollisions = function(pipes){
  for(var i = 0; i < pipes.length; i++){
    let e = pipes[i];
    let highPipe = e.ypos <= 0;
    let x0 = e.xpos, x1 = e.xpos+e.width;
    let alpha2 = this.x + 44;
    let beta2 = this.y;
    if (highPipe ){
      let y0 = e.ypos + e.length;
      let alpha = this.x;
      let beta = this.y - this.height/2;
      if (alpha > x0 && alpha < x1 && beta < y0 ||
          alpha2 > x0 && alpha2 < x1 && beta2 < y0){
        return true;
      }
    }
    else{
      let y2 = e.ypos;
      let a = this.x;
      let b = this.y + this.height/2;
      if (a > x0 && a < x1 && b > y2 ||
          alpha2 > x0 && alpha2 < x1 && beta2 > y2) {
        return true;
      }
    }
  }
  return false;
};
