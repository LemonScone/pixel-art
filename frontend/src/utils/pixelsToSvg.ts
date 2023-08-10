/*! PIXELS to SVG | MIT *
 * https://codepen.io/shshaw/details/XbxvNj !*/

type Colors = {
  [key: string]: number[][];
};

const convertImage = (img: ImageData) => {
  "use strict";

  function componentToHex(c: string) {
    const hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function getColor(...rgba: string[]) {
    const [r, g, b, a] = rgba;
    const alpha = parseInt(a);
    if (a === undefined || alpha === 255) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    if (alpha === 0) {
      return false;
    }
    return "rgba(" + r + "," + g + "," + b + "," + alpha / 255 + ")";
  }

  // Optimized for horizontal lines
  function makePathData(x: number, y: number, w: number) {
    return "M" + x + " " + y + "h" + w + "";
  }

  function makePath(color: string, data: string) {
    return '<path stroke="' + color + '" d="' + data + '" />\n';
  }

  function colorsToPaths(colors: Colors) {
    let output = "";

    // Loop through each color to build paths
    for (const [color, values] of Object.entries(colors)) {
      const rgba = color.toString().split(",");
      const pixelColor = getColor(...rgba);

      if (pixelColor === false) {
        return;
      }

      const paths = [];
      let curPath = [] as number[];
      let w = 1;

      // Loops through each color's pixels to optimize paths
      values.forEach((value) => {
        const [x, y] = value;

        if (curPath && y === curPath[1] && x === curPath[0] + w) {
          w++;
        } else {
          if (curPath.length > 0) {
            paths.push(makePathData(curPath[0], curPath[1], w));
            w = 1;
          }
          curPath = value;
        }
      });

      paths.push(makePathData(curPath[0], curPath[1], w)); // Finish last path
      output += makePath(pixelColor, paths.join(""));
    }

    return output;
  }

  const getColors = (img: ImageData) => {
    const colors = {} as Colors;
    const data = img.data;
    const len = data.length;
    const w = img.width;

    for (let i = 0; i < len; i += 4) {
      const transparent = data[i + 3] === 0;
      if (!transparent) {
        const color =
          data[i] + "," + data[i + 1] + "," + data[i + 2] + "," + data[i + 3];
        colors[color] = colors[color] || [];

        const x = (i / 4) % w;
        const y = Math.floor(i / 4 / w);

        colors[color].push([x, y]);
      }
    }

    return colors;
  };

  const colors = getColors(img);
  const paths = colorsToPaths(colors);
  const output =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 ' +
    img.width +
    " " +
    img.height +
    '" shape-rendering="auto">\n<metadata>Made with Grida Pixel https://gridapixel.site/</metadata>\n' +
    paths +
    "</svg>";

  // Send message back to the main script
  return output;
};

export { convertImage };
