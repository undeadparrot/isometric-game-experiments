import tilesheet0 from "../tiles/tilesheet.0.1024x512.png.js";
export const TILES = {
  ...tilesheet0,
  sample: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 0,
    wMult: 45 / 45,
    topPadding: 0,
    hMult: 1,
    sx: 0,
    sy: 36,
    sw: 90,
    sh: 35
  },
  blue: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 0,
    wMult: 45 / 45,
    topPadding: 0,
    hMult: 1,
    sx: 0,
    sy: 0,
    sw: 90,
    sh: 35
  },
  wide: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 40,
    wMult: (45 + 40) / 45,
    topPadding: 0,
    hMult: 1,
    sx: 91,
    sy: 0,
    sw: 90 + 40 * 2,
    sh: 35
  },
  tall: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 0,
    wMult: 45 / 45,
    topPadding: 12,
    /* (height + top) / height */
    hMult: (18 * 2 + 12) / (18 * 2),
    sx: 0,
    sy: 72,
    sw: 90,
    sh: 35 + 12
  },
  stone1: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 0,
    wMult: 45 / 45,
    topPadding: 5,
    /* (height + top) / height */
    hMult: (18 * 2 + 5) / (18 * 2),
    sx: 91,
    sy: 36,
    sw: 90,
    sh: 40
  },
  stone2: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 0,
    wMult: 45 / 45,
    topPadding: 5,
    /* (height + top) / height */
    hMult: (18 * 2 + 5) / (18 * 2),
    sx: 182,
    sy: 36,
    sw: 90,
    sh: 40
  },
  grass: {
    filename: "./tiles/tilesheet.png",
    leftPadding: 0,
    wMult: 45 / 45,
    topPadding: 5,
    /* (height + top) / height */
    hMult: (18 * 2 + 5) / (18 * 2),
    sx: 91,
    sy: 77,
    sw: 90,
    sh: 40
  }
};
