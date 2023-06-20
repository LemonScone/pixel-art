import { useState } from "react";
import { COLOR_REGEX, INITIAL_COLOR_PALLETE } from "../constants";
import type { Tool, ToolOption } from "../types/Tool";
import ColorSwatch from "./ColorSwatch";
import ColorPicker from "./ColorPicker";

type setStateType = (current: boolean) => boolean;

type ColorAddButtonProps = {
  onUpdateIsColorPickerActive: (current: setStateType) => void;
};

type ColorPalleteProps = {
  toolOptions: ToolOption;
  onUpdateToolOptions: (toolOptions: ToolOption) => void;
  onUpdateSelectedTool: (tool: Tool) => void;
};

const ColorAddButton = ({
  onUpdateIsColorPickerActive,
}: ColorAddButtonProps) => {
  const handleClick = () => {
    onUpdateIsColorPickerActive((current: boolean) => !current);
  };

  return (
    <div
      className={`m-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[rgb(175,242,133)] shadow-[0_0px_2px_1px_rgba(175,242,133)] hover:scale-125`}
      onClick={handleClick}
    >
      ✚
    </div>
  );
};

const ColorPallete = ({
  toolOptions,
  onUpdateToolOptions,
  onUpdateSelectedTool,
}: ColorPalleteProps) => {
  const [colorPallete, setColorPallete] = useState(INITIAL_COLOR_PALLETE);
  const [isColorPickerActive, setIsColorPickerActive] =
    useState<boolean>(false);

  const colorString = toolOptions.pen.color;
  const colorMatches: RegExpMatchArray | null = colorString.match(COLOR_REGEX);
  const colorObject = {
    r: colorMatches?.[1] !== undefined ? +colorMatches?.[1] : 0,
    g: colorMatches?.[2] !== undefined ? +colorMatches?.[2] : 0,
    b: colorMatches?.[3] !== undefined ? +colorMatches?.[3] : 0,
  };

  const handleColorSwatchClick = (color: string) => {
    const newPen = {
      ...toolOptions.pen,
      color,
    };
    onUpdateToolOptions({ ...toolOptions, pen: newPen });
    onUpdateSelectedTool("pen");
  };

  const handleColorPickerClose = (selectedColor: string) => {
    if (selectedColor !== colorString) {
      if (!colorPallete.includes(selectedColor)) {
        setColorPallete((current) => [...current, selectedColor]);
      }
      const newPen = {
        ...toolOptions.pen,
        color: selectedColor,
      };
      onUpdateToolOptions({ ...toolOptions, pen: newPen });
    }
  };

  return (
    <div className="flex max-w-[260px] flex-wrap" role="pallete">
      {colorPallete.map((color) => {
        return (
          <ColorSwatch
            key={color}
            color={color}
            isActiveColor={color === colorString}
            onUpdateToolOptionsAndSelectedTool={handleColorSwatchClick}
          />
        );
      })}
      <div className="relative">
        <ColorAddButton onUpdateIsColorPickerActive={setIsColorPickerActive} />
        {isColorPickerActive && (
          <ColorPicker
            colIndex={colorPallete.length % 5}
            activeColor={colorObject}
            onUpdateIsColorPickerActive={setIsColorPickerActive}
            onUpdateColorPallete={handleColorPickerClose}
          />
        )}
      </div>
    </div>
  );
};

export default ColorPallete;
