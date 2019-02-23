function Character(images, map, sprite, xTile, yTile){ 

  this.img = images;
  this.map = map;
  this.sprite = sprite;
  this.xTile = xTile;
  this.yTile = yTile;

  this.draw = function(ctx){
    var img = this.img[this.sprite];
    x = this.xTile*this.map.widthTile;
    y = this.yTile*this.map.heightTile;
    ctx.drawImage(img, x, y);
  };

}

Character.prototype.run = function(event, targets = []){

  if (event == "down") {
    if (this.map.checkPath(this.xTile, this.yTile + 1)) {
      this.yTile += 1;
      this.sprite = 0;
    }
  }
  if (event == "up") {
    if (this.map.checkPath(this.xTile, this.yTile - 1)) {
      this.yTile -= 1;
      this.sprite = 1;
    }
  }
  if (event == "left") {
    if (this.map.checkPath(this.xTile - 1, this.yTile)) {
      this.xTile -= 1;
      this.sprite = 2;
    }
  }
  if (event == "right") {
    if (this.map.checkPath(this.xTile + 1, this.yTile)) {
      this.xTile += 1;
      this.sprite = 3;
    }
  }

  var check = false;
  for(i=0; i<targets.length && !check; i++)
    check = this.targetReached(targets[i]);
  return check;

};

Character.prototype.followTarget = function(target) {

  if(target.yTile>this.yTile) {
    if (this.map.checkPath(this.xTile, this.yTile + 1)){
      this.yTile += 1;
      this.sprite = 0;
      return this.targetReached(target);
    }
  }

  if(target.yTile<this.yTile) {
    if (this.map.checkPath(this.xTile, this.yTile - 1)){
      this.yTile -= 1;
      this.sprite = 1;
      return this.targetReached(target);
    }
  }

  if(target.xTile>this.xTile) {
    if (this.map.checkPath(this.xTile + 1, this.yTile)) {
      this.xTile += 1;
      this.sprite = 3;
      return this.targetReached(target);
    }
  }

  if(target.xTile<this.xTile) {
    if (this.map.checkPath(this.xTile - 1, this.yTile)) {
      this.xTile -= 1;
      this.sprite = 2;
      return this.targetReached(target);
    }
  }

};

Character.prototype.targetReached = function(target) {
  if (target.xTile==this.xTile && target.yTile==this.yTile) {
    return true;
  }else{
    return false;
  }
};