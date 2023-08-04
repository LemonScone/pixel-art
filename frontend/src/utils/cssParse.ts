import {
  getImageData,
  getAnimationKeyframes,
  getAnimationCssClassOutput,
  getImageCssClassOutput,
} from "box-shadow-pixels";
import { Frame } from "../types/Project";
import { BoxShadow } from "../types/BoxShadow";

const CSS_CLASS_NAME = "grid-a-pixel";

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
      propertiesStr += `${capitalizedProperty}: ${
        properties[property as keyof typeof properties]
      }; `;
    }

    css += `${keyframeStr} { ${propertiesStr} }\n`;
  }

  return css;
};

const generateAnimationCSSClass = ({
  frames,
  columns,
  cellSize,
  duration,
}: {
  frames: Frame[];
  columns: number;
  cellSize: number;
  duration: number;
}) => {
  const frameWithInterval = frames.map((frame) => ({
    ...frame,
    interval: frame.animateInterval,
  }));
  return getAnimationCssClassOutput(frameWithInterval, {
    pSize: cellSize,
    c: columns,
    duration,
    cssClassName: CSS_CLASS_NAME,
  });
};

const generateImageCssClass = ({
  frame,
  columns,
  cellSize,
}: {
  frame: Frame;
  columns: number;
  cellSize: number;
}) => {
  return getImageCssClassOutput(frame.grid, {
    format: "string",
    pSize: cellSize,
    c: columns,
    cssClassName: CSS_CLASS_NAME,
  });
};
export {
  generatePixelDrawCSS,
  generateAnimationCSSData,
  generateKeyframes,
  generateAnimationCSSClass,
  generateImageCssClass,
};
