import { map, pipe, toArray } from "@fxts/core";
import { Project } from "../types/Project";
import {
  generateAnimationCSSData,
  generatePixelDrawCSS,
} from "../utils/cssParse";
import Animation from "./Animation";
import { framesToArray } from "../utils/frames";

type PreviewProps = {
  project: Project;
  duration: number;
  animate: boolean;
  cellSize: number;
  activeFrameIndex?: number;
};
const Preview = ({
  project,
  duration,
  animate,
  cellSize,
  activeFrameIndex = 0,
}: PreviewProps) => {
  const { gridColumns, gridRows, frameIds, indexedFrames } = project;

  const animation = frameIds.length > 1 && animate;

  let cssString;
  let animationData;

  if (animation) {
    const frames = pipe(
      framesToArray(frameIds, indexedFrames),
      map((frms) => ({ ...frms, interval: frms.animateInterval })),
      toArray
    );
    animationData = generateAnimationCSSData(frames, gridColumns, cellSize);
  } else {
    const grid = indexedFrames[frameIds[activeFrameIndex]].grid;
    cssString = generatePixelDrawCSS(grid, gridColumns, cellSize, "string");
  }

  return (
    <div
      style={{
        width: gridColumns * cellSize + cellSize * 2,
        height: gridRows * cellSize + cellSize * 2,
        position: "relative",
      }}
    >
      <div
        style={
          animation
            ? undefined
            : {
                height: cellSize,
                width: cellSize,
                boxShadow: cssString,
                MozBoxShadow: cssString,
                WebkitBoxShadow: cssString,
                position: "absolute",
              }
        }
      >
        {animation ? (
          <Animation boxShadow={animationData} duration={duration} />
        ) : null}
      </div>
    </div>
  );
};

export default Preview;
