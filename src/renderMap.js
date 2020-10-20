export function calculateStartCoords(xCount, yCount, tileWidth, tileHeight) {
  let x = yCount * (tileWidth * 0.5);
  let y = tileHeight;
  return { x, y };
}
export function renderMap(config) {
  const { ctx, tileY, tileX, tileZ, panX = 0, panY = 0, map } = config;
  ctx.fillStyle = "silver";
  ctx.fillRect(0, 0, config.width, config.height);

  const debugPoints = [];
  let start = calculateStartCoords(map.w, map.h, tileX, tileZ);
  start.x += panX;
  start.y += panY;
  for (let i = 0; i < map.w; i++) {
    for (let j = 0; j < map.h; j++) {
      let z = 0;
      const index = j * map.w + i;
      let tile = map.lookup[map.tiles[index]];
      var { x, y, x0, y0, w, h } = calculateCoords(
        tile,
        start,
        tileX,
        tileZ,
        i,
        j,
        z
      );
      debugPoints.push([x, y]);
      const { sx, sy, sw, sh } = tile;
      ctx.drawImage(tile.img, sx, sy, sw, sh, x0, y0, w, h);
    }

    ctx.fillStyle = "yellow";
    debugPoints.map(([x, y]) => ctx.fillRect(x, y, 1, 1));
  }
}
function calculateCoords(tile, start, tileWidth, tileHeight, i, j, z = 0) {
  let x = start.x;
  let y = start.y;

  let halfWidth = tileWidth / 2;
  let halfHeight = tileHeight / 2;

  x += halfWidth * i; // move forward for i
  x += halfWidth * -j; // move back for j

  y += halfHeight * i; // move down for i
  y += halfHeight * j; // move down for j

  y += -z * tileHeight; // move up for z

  const w = tileWidth * tile.wMult;
  const h = tileHeight * tile.hMult;
  const x0 = x - w / 2;
  const y0 = y - h;
  return { x, y, x0, y0, w, h };
}
