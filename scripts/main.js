let player;
let gameState = 1;

const Input = {
  keys: [],
  listen: function () {
    window.addEventListener("keydown", (e) => {
      Input.keys[e.code] = true;
      // console.log(Input.keys)
    });
    window.addEventListener("keyup", (e) => {
      Input.keys[e.code] = !true;
    });
  },
};

const Game = {

  init: function () {
    Graphics.initCanvas();
    initTiles();
  },

  resetGame: function() {
    tiles = []
    initTiles()
    TILE_VELOCITY = INITIAL_VELOCITY
    player.resetPlayer()
  },

  update: function () {
    if (gameState == 2) { //game end
      if (Input.keys['Enter']){
        Game.resetGame()
        gameState = 0
      }
    }
    else if (gameState == 1) {
      Graphics.clearCanvas();
      Graphics.showMessage('press enter to start')
      if (Input.keys['Enter']){
        gameState = 0
      }
    }
    else if (gameState == 0) {
      Graphics.clearCanvas();
      Graphics.updateBackground();
      updateTiles();
      player.update();
    }
    requestAnimationFrame(Game.update);
  },
};

Game.init(); // Initialize the game
Input.listen();
player = initPlayer();
window.requestAnimationFrame(Game.update);
