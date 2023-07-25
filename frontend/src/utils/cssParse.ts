import { getImageData, getAnimationKeyframes } from "box-shadow-pixels";
import { Frame } from "../types/Project";
import { BoxShadow } from "../types/BoxShadow";

const generatePixelDrawCSS = (
  frame: string[],
  columns: number,
  cellSize: number,
  type: string
) => {
  return getImageData(frame, { format: type, pSize: cellSize, c: columns });
};

const generateAnimationCSSData = (
  frames: Frame[],
  columns: number,
  cellSize: number
) => {
  return getAnimationKeyframes(frames, {
    pSize: cellSize,
    c: columns,
  });
};

const generateKeyframes = (obj: BoxShadow) => {
  let css = "";
  for (const keyframe in obj) {
    const properties = obj[keyframe];
    let keyframeStr = keyframe;

    if (keyframe.includes(",")) {
      keyframeStr = keyframe
        .split(",")
        .map((k) => k.trim())
        .join(", ");
    }

    let propertiesStr = "";
    for (const property in properties) {
      const capitalizedProperty = property.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      );
      console.log(property);
      propertiesStr += `${capitalizedProperty}: ${
        properties[property as keyof typeof properties]
      }; `;
    }

    css += `${keyframeStr} { ${propertiesStr} }\n`;
  }

  return css;
};
export { generatePixelDrawCSS, generateAnimationCSSData, generateKeyframes };
