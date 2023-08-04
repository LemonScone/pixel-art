import { Project } from "../types/Project";
import {
  generateAnimationCSSData,
  generatePixelDrawCSS,
} from "../utils/cssParse";
import Animation from "./Animation";

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
  const { gridColumns, gridRows, frames } = project;

  const animation = frames.length > 1 && animate;

  let cssString;
  let animationData;

  if (animation) {
    animationData = generateAnimationCSSData(
      frames.map((frame) => ({ ...frame, interval: frame.animateInterval })),
      gridColumns,
      cellSize
    );
  } else {
    const grid = frames[activeFrameIndex].grid;
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
