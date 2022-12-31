const PLAYER_SIZE = 25;
const VEL = 3;
const GRAVITY = 3;

class Player {
  constructor() {
    this.resetPlayer()
    this.isColliding = false;
  }

  draw() {
    Graphics.createCircle(this.x, this.y, PLAYER_SIZE, "red");
  }

  resetPlayer() {
    let maxDistFromTile = 300
    let randX = rand(tiles.at(-1).gapStart - maxDistFromTile, tiles.at(-1).gapStart + maxDistFromTile)
    if (randX - 2 * PLAYER_SIZE < 0 || randX - 2 * PLAYER_SIZE > innerWidth) randX = innerWidth / 2  
    this.x = randX
    this.y = 100
  }

  handleInput() {
    if (Input.keys["KeyD"] && this.x + PLAYER_SIZE < innerWidth) {
      this.x += VEL;
    }
    if (Input.keys["KeyA"] & this.x - PLAYER_SIZE > 0) {
      this.x -= VEL;
    }
    // if (Input.keys["KeyS"]) {
    //   this.y += VEL;
    // }
  }

  handleCollisions() {
    tile = getTileBelowPlayer();
    if (
      tile.y - player.y < PLAYER_SIZE &&
      !(
        tile.gapStart + PLAYER_SIZE < player.x &&
        player.x < tile.gapStart + GAP_SIZE - PLAYER_SIZE
      )
    ) {
      player.y = tile.y - PLAYER_SIZE;
      player.isColliding = true
    }
    else{
        player.isColliding = false
    }
  }

  update() {
    this.handleInput();
    this.handleCollisions();

    if (!this.isColliding) {
      this.y += GRAVITY
    }

    if (player.y - PLAYER_SIZE < 0) {
        Graphics.showMessage('you lose!')
        gameState = 2
    }

    this.draw();
  }
}

function initPlayer() {
  player = new Player();
  return player;
}
