import fs from "fs";
import getPixels from "get-pixels";
import { COLORS, COLOR_PALLETTE, COLOR_MAPPING } from "./constants.mjs";

// Currently the following file formats are supported: PNG, JPEG, GIF
getPixels("https://i.imgur.com/4O8VFQY.jpg", (err, pixels) => {
  if (err) {
    console.log("Bad image path");
    return;
  }
  console.log("got pixels", pixels.shape);
  let w = pixels.shape[0];
  let h = pixels.shape[1];
  let s = "0x";
  let outArr = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = pixels.get(x, y, 0);
      let g = pixels.get(x, y, 1);
      let b = pixels.get(x, y, 2);
      let a = pixels.get(x, y, 3);
      // console.log("pixel", x, y, r, g, b, a);
      let hasColor = false;
      for (const [color, rgb] of Object.entries(COLOR_PALLETTE)) {
        if (r === rgb[0] && g === rgb[1] && b === rgb[2]) {
          s = `${s}${COLOR_MAPPING[color]}`;
          hasColor = true;
          break;
        }
      }
      if (!hasColor) {
        s = `${s}${COLOR_MAPPING[COLORS.White]}`;
      }
      if (s.length === 4) {
        outArr.push(s);
        s = "0x";
      }
    }
  }
  console.log(outArr);
  try {
    fs.writeFileSync("out.txt", JSON.stringify(outArr));
  } catch (err) {
    console.error(err);
  }
});
