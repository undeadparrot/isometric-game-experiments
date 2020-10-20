export function mountStorybook(root, config) {
  const { stories } = config;
  const mainDiv = document.createElement("div");
  mainDiv.className = "ministory";

  const totalP = document.createElement("p");
  totalP.className = "ministory__total";
  mainDiv.appendChild(totalP);

  const storiesDiv = document.createElement("div");
  storiesDiv.className = "ministory__stories";
  mainDiv.appendChild(storiesDiv);

  const evaluatedStories = Object.values(stories).map(evaluateStory);
  evaluatedStories.map(elementFromStory).map((e) => storiesDiv.appendChild(e));
  const total = evaluatedStories.length;
  const totalFailed = evaluatedStories.reduce(
    (count, story) => (story.error ? count + 1 : count),
    0
  );
  totalP.innerText = `${total - totalFailed} of ${total} OK`;

  root.appendChild(mainDiv);
}

function evaluateStory(story) {
  const args = {};
  if (story.canvas) {
    args.canvas = document.createElement("canvas");
    args.canvas.crossOrigin = "Anonymous";
    args.width = args.canvas.width = 150;
    args.height = args.canvas.height = 150;
    args.ctx = args.canvas.getContext("2d");
    args.ctx.imageSmoothingEnabled = false;
  }
  let error = null;
  try {
    story.f(args);
  } catch (error_) {
    error = error_;
  }
  return {
    ...story,
    canvas: args.canvas,
    error
  };
}

function elementFromStory(story) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("story");
  let error = story.error;

  if (story.canvas) {
    const zoomDiv = document.createElement("div");
    zoomDiv.className = "story__zoom";
    mainDiv.appendChild(zoomDiv);
    mainDiv.appendChild(story.canvas);

    if (error === null && story.hash) {
      const hash = story.canvas
        .getContext("2d")
        .getImageData(0, 0, story.canvas.width, story.canvas.height)
        .data.reduce((acc, datum) => acc + datum, 0);
      if (story.hash !== hash) {
        error = new Error(`Hash: ${hash} !== ${story.hash}`);
      }
    }
  }

  const titleH4 = document.createElement("h4");
  titleH4.innerText = story.name;
  mainDiv.appendChild(titleH4);

  if (error !== null) {
    const errorP = document.createElement("p");
    errorP.className = "story__error";
    errorP.innerText = error.message;
    mainDiv.appendChild(errorP);
    mainDiv.classList.add("story--error");
  }

  return mainDiv;
}
