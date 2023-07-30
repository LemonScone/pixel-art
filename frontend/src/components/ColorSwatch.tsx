import { COLOR_REGEX } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { changePenColor, changeSelectedTool } from "../store";

type ColorSwatchProps = {
  color: string;
};

const ColorSwatch = ({ color }: ColorSwatchProps) => {
  const dispatch = useAppDispatch();
  const {
    selectedTool,
    options: {
      pen: { color: currentColor },
    },
  } = useAppSelector((state) => state.projects);

  const handleColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const boxShadowValue = window
      .getComputedStyle(target)
      .getPropertyValue("box-shadow");

    const colorMatches: RegExpMatchArray | null =
      boxShadowValue.match(COLOR_REGEX);

    if (colorMatches) {
      setTimeout(() => {
        dispatch(changePenColor(color));
        if (selectedTool !== "pen" && selectedTool !== "bucket") {
          dispatch(changeSelectedTool("pen"));
        }
      }, 100);
    }
    target.style.boxShadow = `${color} 0px 0px 0px 4px inset, ${color} 0px 0px 2px 1px`;
  };

  const isCurrentColor = currentColor === color;

  return (
    <div
      role="button"
      aria-label="color swatch"
      className="m-2 h-6 w-6 cursor-pointer rounded bg-transparent hover:scale-125"
      style={{
        boxShadow: `${
          isCurrentColor ? ` ${color} 0px 0px 2px 1px,` : ""
        } ${color} 0px 0px 0px ${isCurrentColor ? "4px" : "18px"} inset`,
        transition: "200ms box-shadow ease",
      }}
      onClick={handleColorClick}
    ></div>
  );
};
export default ColorSwatch;
