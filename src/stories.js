import { calculateStartCoords, renderMap } from "./renderMap";
import { TILES } from "./TILES";

function assert(condition, message) {
  if (!condition) {
    message = message || "Assertion failed";
    if (typeof Error !== "undefined") {
      throw new Error(message);
    }
    throw message; // Fallback
  }
}
function assertEq(left, right, message = "") {
  assert(left === right, `${message} ${left} is not ${right}`);
}

function makeFlatMap(w, h) {
  const tiles = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      tiles.push(0);
    }
  }
  return {
    w,
    h,
    tiles,
    lookup: {
      0: TILES.sample
    }
  };
}

function makeCheckerboardMap(w, h, a = TILES.sample, b = TILES.blue) {
  const tiles = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tile = x % 2 === y % 2 ? 0 : 1;
      tiles.push(tile);
    }
  }
  return {
    w,
    h,
    tiles,
    lookup: {
      0: a,
      1: b
    }
  };
}

const whereToStartDrawing = [
  [
    [1, 1],
    [4, 3]
  ],
  [
    [1, 2],
    [8, 3]
  ],
  [
    [2, 1],
    [4, 3]
  ],
  [
    [2, 2],
    [8, 3]
  ],
  [
    [3, 2],
    [8, 3]
  ],
  [
    [2, 3],
    [12, 3]
  ]
].map(([given, expected]) => ({
  name: `Where To Start Drawing ${given[0]}x${given[1]}`,
  f: function () {
    const coords = calculateStartCoords(given[0], given[1], 8, 3);
    assertEq(coords.x, expected[0], "X");
    assertEq(coords.y, expected[1], "Y");
  }
}));

const landscapeTests = [
  [1, 1, 100],
  [1, 2, 100],
  [2, 1, 100],
  [2, 2, 50],
  [3, 2, 50],
  [2, 3, 50],
  [3, 3, 50]
].map(([xCount, yCount, size]) => ({
  name: `Landscape ${xCount}x${yCount}`,
  canvas: true,
  f: function ({ ctx, width, height }) {
    renderMap({
      ctx: ctx,
      tiles: TILES,
      width,
      height,
      tileX: size,
      tileY: size,
      tileZ: size / 2,
      map: makeCheckerboardMap(xCount, yCount)
    });
  }
}));

export default [
  {
    name: "Story of Grey",
    canvas: true,
    f: function ({ ctx, width, height }) {
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, width, height);
    }
  },

  {
    name: "Green with Box",
    hash: 8588892,
    canvas: true,
    f: function ({ ctx, width, height }) {
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeRect(0, 0, width / 2, height / 2);
    }
  },

  {
    name: "Grass and Stone",
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 50,
        tileY: 50,
        tileZ: 50 / 2,
        map: makeCheckerboardMap(3, 3, TILES.grass, TILES.stone2)
      });
    }
  },

  {
    name: `Wide Tile 1x1`,
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 100,
        tileY: 100,
        tileZ: 100 / 2,
        map: makeCheckerboardMap(1, 1, TILES.wide, TILES.sample)
      });
    }
  },
  {
    name: `Wide Tile 2x2`,
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 100,
        tileY: 100,
        tileZ: 100 / 2,
        map: makeCheckerboardMap(2, 2, TILES.wide, TILES.sample)
      });
    }
  },
  {
    name: `Tall Tile 1x1`,
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 100,
        tileY: 100,
        tileZ: 100 / 2,
        map: makeCheckerboardMap(1, 1, TILES.tall, TILES.sample)
      });
    }
  },
  {
    name: `Tall Tile 2x2`,
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 100,
        tileY: 100,
        tileZ: 100 / 2,
        map: makeCheckerboardMap(2, 2, TILES.tall, TILES.sample)
      });
    }
  },

  {
    name: `New Tiles`,
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 50,
        tileY: 50,
        tileZ: 50 / 2,
        map: makeCheckerboardMap(4, 4, TILES.Stones_n_0000, TILES.Plane_n_0000)
      });
    }
  },

  {
    name: `New Tiles`,
    canvas: true,
    f: function ({ ctx, width, height }) {
      renderMap({
        ctx: ctx,
        tiles: TILES,
        width,
        height,
        tileX: 50,
        tileY: 50,
        tileZ: 50 / 2,
        panY: 50,
        map: {
          w: 3,
          h: 3,
          tiles: [3, 0, 1, 1, 2, 2, 2, 2, 2],
          lookup: {
            0: TILES["Stones.001_n_0011"],
            1: TILES["Stones.001_n_0010"],
            2: TILES["Stones.001_n_0000"],
            3: TILES["Stones.001_n_1011"]
          }
        }
      });
    }
  },

  ...landscapeTests,
  ...whereToStartDrawing
];
