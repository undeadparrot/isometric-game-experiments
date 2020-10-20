import { DUMMY_IMG } from "./TILES.js";
const cache = {};
export function preloadImages(tiles, callback) {
  const unfetchedImageKeys = Object.keys(tiles).filter(
    (key) => tiles[key].img === undefined
  );
  if (unfetchedImageKeys.length > 0) {
    const key = unfetchedImageKeys[0];
    const url = tiles[key].filename;
    if (cache[url]) {
      console.log("Already have", url);
      tiles[key].img = cache[url];
      return preloadImages(tiles, callback);
    }
    console.log("Fetching", url);
    cache[url] = new Image();
    cache[url].crossOrigin = "Anonymous";
    tiles[key].img = cache[url];

    tiles[key].img.onload = function () {
      console.log("Fetched", url);
      preloadImages(tiles, callback);
    };
    tiles[key].img.onerror = function (err) {
      console.log("Failed", url, err);
    };
    tiles[key].img.src = url;
  } else {
    callback();
  }
}
