let tiles = [];
//0,5

const INITIAL_VELOCITY = 0.5;
const MAX_VELOCITY = 1.5;
const TILE_SIZE = 25;
const GAP_SIZE = 200;
const TILE_MARGIN = 125;
const TILES_PER_FRAME = 7;
const GAP_WINDOW_MARGIN = 80

let TILE_VELOCITY = INITIAL_VELOCITY;

class Tile {
  constructor(y) {
    this.y = y;
    this.gapStart = rand(GAP_WINDOW_MARGIN, innerWidth - GAP_SIZE - GAP_WINDOW_MARGIN);
    this.update();
  }

  draw() {
    Graphics.createSquare(0, this.y, this.gapStart, TILE_SIZE);
    Graphics.createSquare(
      this.gapStart + GAP_SIZE,
      this.y,
      innerWidth - this.gapStart - GAP_SIZE,
      TILE_SIZE
    );
  }

  update() {
    this.y -= TILE_VELOCITY;
    this.draw();
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function initTiles() {
  const refPoint = innerHeight;
  for (let i = 0; i < TILES_PER_FRAME; i++) {
    let tile = new Tile(refPoint - i * TILE_MARGIN);
    tiles.push(tile);
  }
}

function createTileBelow() {
  let tile = new Tile(innerHeight);
  tiles.unshift(tile);
}

function getTileBelowPlayer() {
  let y = player.y;
  let distanceFromTiles = [];
  for (let i = 0; i < tiles.length; i++) {
    if (player.y - tiles[i].y > 0) continue;
    distanceFromTiles.push(tiles[i].y - player.y);
  }
  minDistance = Math.min(...distanceFromTiles);
  tile = tiles.find((tile) => tile.y - player.y == minDistance);
  return tile;
}

function updateTiles() {
  tiles.forEach((t) => {
    t.update();
  });
  if (tiles.at(-1).y + TILE_SIZE < 0) {
    tiles.pop();
  }
  if (tiles[0].y < innerHeight - TILE_MARGIN) {
    createTileBelow();
  }
  if (TILE_VELOCITY < MAX_VELOCITY) TILE_VELOCITY *= 1.001;
}
