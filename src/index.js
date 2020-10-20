import { mountStorybook } from "./ministory.js";
import { preloadImages } from "./preload-images.js";
import stories from "./stories.js";
import { TILES } from "./TILES.js";

preloadImages(TILES, () => {
  const body = document.getElementsByTagName("body")[0];
  mountStorybook(body, {
    stories: stories
  });
});
