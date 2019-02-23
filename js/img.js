function getImagesCharacter(route, name, format){
  var images = []
  images.push(new Img(route + name + "_down." + format, 66, 66));
  images.push(new Img(route + name + "_up." + format, 66, 66));
  images.push(new Img(route + name + "_left." + format, 66, 66));
  images.push(new Img(route + name + "_right." + format, 66, 66));
  return images;
}

function Img(src, width, height){
  var img = new Image(width, height);
  img.src = src;
  return img;
}
