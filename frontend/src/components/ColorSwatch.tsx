import { COLOR_REGEX } from "../constants";

type ColorSwatchProps = {
  color: string;
  isActiveColor: boolean;
  onChangeToolOptionsAndSelectedTool: (color: string) => void;
};

const ColorSwatch = ({
  color,
  isActiveColor,
  onChangeToolOptionsAndSelectedTool,
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
        onChangeToolOptionsAndSelectedTool(colorMatches[0]);
      }, 100);
    }
    target.style.boxShadow = `${color} 0px 0px 0px 4px inset, ${color} 0px 0px 2px 1px`;
  };

  return (
    <div
      role="button"
      aria-label="color swatch"
      className={`m-2 h-9 w-9 cursor-pointer rounded bg-transparent hover:scale-125`}
      style={{
        boxShadow: `${
          isActiveColor ? ` ${color} 0px 0px 2px 1px,` : ""
        } ${color} 0px 0px 0px ${isActiveColor ? "4px" : "18px"} inset`,
        transition: "200ms box-shadow ease",
      }}
      onClick={handleColorClick}
    ></div>
  );
};
export default ColorSwatch;
