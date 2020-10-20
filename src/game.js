import { TILES } from "./TILES.js";
import { renderMap } from "./renderMap.js";
import { preloadImages } from "./preload-images.js";
const WIDTH = 320;
const HEIGHT = 200;
const MAPW = 4;
const MAPH = 5;
const TILEX = 32 * 2;
const TILEY = 32 * 2;
const TILEZ = 16 * 2;

const pageCanvas = document.createElement("canvas");
const pageCtx = pageCanvas.getContext("2d");
document.getElementsByTagName("body")[0].appendChild(pageCanvas);
pageCanvas.width = WIDTH * 2;
pageCanvas.height = HEIGHT * 2;

const bufferCanvas = document.createElement("canvas");
const bufferCtx = bufferCanvas.getContext("2d");
bufferCanvas.width = WIDTH;
bufferCanvas.height = HEIGHT;

const STATE = {
  time: 0,
  delta: 0
};

function gameFrame(time) {
  STATE.delta = time - STATE.time;
  STATE.time = time;

  render();

  requestAnimationFrame(gameFrame);
}

function render() {
  renderMap({
    ctx: bufferCtx,
    tiles: TILES,
    width: WIDTH,
    height: HEIGHT,
    tileX: TILEX,
    tileY: TILEY,
    tileZ: TILEZ,
    mapW: MAPW,
    mapH: MAPH
  });
  pageCtx.drawImage(bufferCanvas, 0, 0, WIDTH, HEIGHT);
}

preloadImages(TILES, gameFrame);
