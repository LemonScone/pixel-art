import { COLOR_REGEX } from "../constants";

type ColorSwatchProps = {
  color: string;
  isActiveColor: boolean;
  onUpdateToolOptionsAndSelectedTool: (color: string) => void;
};

const ColorSwatch = ({
  color,
  isActiveColor,
  onUpdateToolOptionsAndSelectedTool,
}: ColorSwatchProps) => {
  const handleColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const boxShadowValue = window
      .getComputedStyle(target)
      .getPropertyValue("box-shadow");

    const colorMatches: RegExpMatchArray | null =
      boxShadowValue.match(COLOR_REGEX);

    if (colorMatches) {
      setTimeout(() => {
        onUpdateToolOptionsAndSelectedTool(colorMatches[0]);
      }, 100);
    }
    target.style.boxShadow = `${color} 0px 0px 0px 4px inset, 0px 0px 2px 1px ${color}`;
  };

  return (
    <div
      data-testid="colorswatch"
      className={`m-2 h-9 w-9 cursor-pointer rounded-full bg-transparent hover:scale-125`}
      style={{
        boxShadow: `${
          isActiveColor ? `0px 0px 2px 1px ${color},` : ""
        } ${color} 0px 0px 0px ${isActiveColor ? "4px" : "18px"} inset`,
        transition: "200ms box-shadow ease",
      }}
      onClick={handleColorClick}
    ></div>
  );
};
export default ColorSwatch;
