$( document ).ready(function(){
  player = prompt("Nombre del jugador", "PlayerName");
  start();
  $(document).keydown(runHuman);
});

function start(){

  painter = new Painter($("#cv")[0]);
  path = [
    [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
    [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5], 
    [0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7],[16,7],
    [8,9],[9,9],[10,9],[11,9],[12,9],[13,9],
    [11,10],[12,10],[13,10],
    [11,11],[12,11],[13,11],
    [4,1],[4,2],[4,4],[4,6],
    [8,4],[8,6],
    [10,6],
    [11,1],[11,2],[11,4],
    [6,8],[6,9],[6,10],
    [8,8],[8,10],
    [6,11],[7,11]
  ];
  map = new Map(66, 66, 17, 13, path);
  
  images = getImagesCharacter('mediaLib/opengameart/characters/humans/', 'GuyLight', 'png');
  human = new Character(images, map, 0, 8, 6);

  zombies = [];
  exitsZombies = [[0,7], [4,1], [11,1], [16,7]];

  stateGame = true;
  tiempo = 0;

  run();
  createZombies();
  runZombies();
  contador();
  playAudioPrincipal();

}

function run() {
  if(stateGame) {
    painter.cleanContextBuffer();
    painter.cleanContext();
    human.draw(painter.contextBuffer);
    for(k=0; k<zombies.length; k++){
      zombies[k].draw(painter.contextBuffer);
    }
    painter.draw();
  }
  setTimeout(run, 100);
}

function runZombies() {
  if(stateGame) {
    for(j=0; j<zombies.length && stateGame; j++)
      stateGame = !zombies[j].followTarget(human);
    if(!stateGame)
      end();
  }
  setTimeout(runZombies, 2000);
}

function runHuman(event) { 
  if(stateGame) {
    if(event.which==38 || event.which==87)
      stateGame = !human.run('up', zombies);
    if(event.which==40 || event.which==83)
      stateGame = !human.run('down', zombies);
    if(event.which==39 || event.which==68)
      stateGame = !human.run('right', zombies);
    if(event.which==37 || event.which==65)
      stateGame = !human.run('left', zombies);
    if(!stateGame)
      end();
  }
}

function end(){
  audios[0].pause();
  audios[0].currentTime = 0;
  alert("Perdiste " + player + "!\nTu puntaje fue " + (tiempo*100));
  if (confirm("Intentarlo de nuevo!")) {
    zombies = [];
    stateGame = true;
    tiempo = 0;
  } 
}

function contador(){
  if(stateGame) {
    tiempo++;
  }
  setTimeout(contador, 1000);
}

function createZombies(){
  if(stateGame) {
    images = getImagesCharacter('mediaLib/opengameart/characters/zombies/', Math.round((Math.random()*(8-1)+1))+ 'Zombie', 'png');
    i = Math.round((Math.random()*3));
    zombies.push(new Character(images, map, 0, exitsZombies[i][0], exitsZombies[i][1]));
    j = Math.round((Math.random()*(3-1)+1));
    setTimeout(function(){audios[j].play()}, 50);
  }
  setTimeout(createZombies, 10000);
}

function playAudioPrincipal(){
  if(stateGame && (tiempo%64)==1) {
    setTimeout(function(){audios[0].play()}, 50);
  }
  setTimeout(playAudioPrincipal, 1000);
}