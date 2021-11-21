import getPixels from "get-pixels";

getPixels("https://i.imgur.com/4O8VFQY.jpg", (err, pixels) => {
  if (err) {
    console.log("Bad image path");
    return;
  }
  console.log("got pixels", pixels.shape);
  let w = pixels.shape[0];
  let h = pixels.shape[1];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = pixels.get(x, y, 0);
      let g = pixels.get(x, y, 1);
      let b = pixels.get(x, y, 2);
      let a = pixels.get(x, y, 3);
      console.log("pixel", x, y, r, g, b, a);
      break;
    }
    break;
  }
});
