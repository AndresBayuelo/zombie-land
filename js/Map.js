var Map = function(widthTile, heightTile, horizontalTiles, verticalTiles, path){ // 17 * 13

  this.widthTile = widthTile;
  this.heightTile = heightTile;
  this.horizontalTiles = horizontalTiles;
  this.verticalTiles = verticalTiles;
  this.path = path;

  this.checkPath = function(xTile, yTile) {
    for (var i=0; i<this.path.length; i++) {
      if ( xTile==this.path[i][0] && yTile==this.path[i][1] )
        return true;
    }
    return false;
  }

};