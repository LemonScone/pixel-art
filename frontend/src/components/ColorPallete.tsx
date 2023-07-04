import { useState } from "react";
import { INITIAL_COLOR_PALLETE } from "../constants";
import ColorSwatch from "./ColorSwatch";
import ColorPicker from "./ColorPicker";
import { changePenColor } from "../store";
import { rgbToObject } from "../utils/color";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

type setStateType = (current: boolean) => boolean;

type ColorAddButtonProps = {
  onChangeIsColorPickerActive: (current: setStateType) => void;
};

const ColorAddButton = ({
  onChangeIsColorPickerActive,
}: ColorAddButtonProps) => {
  const handleClick = () => {
    onChangeIsColorPickerActive((current: boolean) => !current);
  };

  return (
    <div
      role="button"
      aria-label="add new color"
      className={`m-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded text-[rgb(175,242,133)] shadow-[0_0px_2px_1px_rgba(175,242,133)] hover:scale-125`}
      onClick={handleClick}
    >
      ✚
    </div>
  );
};

const ColorPallete = () => {
  const dispatch = useAppDispatch();
  const {
    options: {
      pen: { color },
    },
  } = useAppSelector((state) => state.projects);

  const [colorPallete, setColorPallete] = useState(INITIAL_COLOR_PALLETE);
  const [isColorPickerActive, setIsColorPickerActive] =
    useState<boolean>(false);

  const rgbObject = rgbToObject(color);

  const handleColorPickerClose = (selectedColor: string) => {
    if (selectedColor !== color) {
      if (!colorPallete.includes(selectedColor)) {
        setColorPallete((current) => [...current, selectedColor]);
      }
      dispatch(changePenColor(selectedColor));
    }
  };

  return (
    <div className="flex max-w-[260px] flex-wrap" role="pallete">
      {colorPallete.map((color) => {
        return <ColorSwatch key={color} color={color} />;
      })}
      <div className="relative">
        <ColorAddButton onChangeIsColorPickerActive={setIsColorPickerActive} />
        {isColorPickerActive && (
          <ColorPicker
            colIndex={colorPallete.length % 5}
            activeColor={rgbObject}
            onChangeIsColorPickerActive={setIsColorPickerActive}
            onChangeColorPallete={handleColorPickerClose}
          />
        )}
      </div>
    </div>
  );
};

export default ColorPallete;
