import { useAppSelector } from "../hooks/useRedux";
import {
  generateAnimationCSSData,
  generatePixelDrawCSS,
} from "../utils/cssParse";
import Animation from "./Animation";

type PreviewProps = {
  animate: boolean;
  cellSize: number;
};
const Preview = ({ animate, cellSize }: PreviewProps) => {
  const data = useAppSelector((state) => state.projects.present.data);
  const duration = useAppSelector((state) => state.projects.present.duration);

  const { gridColumns, gridRows, frames } = data;

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
    const grid = frames[0].grid;
    cssString = generatePixelDrawCSS(grid, gridColumns, cellSize, "string");
  }

  return (
    <div className="flex items-center justify-center rounded-xl bg-input-color">
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
    </div>
  );
};

export default Preview;
