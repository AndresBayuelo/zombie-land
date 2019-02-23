function Painter(canvas) {
  
  this.canvas = canvas;
  this.context = this.canvas.getContext("2d");
  
  this.buffer = document.createElement("canvas");
  this.buffer.id = 'cvb';
  $(this.buffer).addClass('layer');
  this.buffer.width = this.canvas.width;
  this.buffer.height = this.canvas.height;
  this.contextBuffer = this.buffer.getContext("2d");

  this.cleanContextBuffer =function(){
    this.contextBuffer.clearRect(0, 0, this.buffer.width, this.buffer.height);
  }

  this.cleanContext =function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.draw = function(){
    this.context.drawImage(this.buffer, 0, 0);
  };

};