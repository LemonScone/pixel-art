import { useState } from "react";
import { ChromePicker, RGBColor, ColorResult } from "react-color";

type ColorPickerProps = {
  colIndex: number;
  activeColor: RGBColor;
  onUpdateIsColorPickerActive: (isColorPickerActive: boolean) => void;
  onUpdateColorPallete: (selectedColor: string) => void;
};
const ColorPicker = ({
  colIndex,
  activeColor,
  onUpdateIsColorPickerActive,
  onUpdateColorPallete,
}: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<RGBColor>(activeColor);
  const [previousColor, setPreviousColor] = useState<RGBColor>();

  const compareColors = (
    selected: RGBColor,
    previous: RGBColor | undefined
  ) => {
    return (
      selected.r === previous?.r &&
      selected.g === previous?.g &&
      selected.b === previous?.b
    );
  };

  const handleChangeComplete = (color: ColorResult) => {
    setSelectedColor(color.rgb);
  };

  const handleClose = () => {
    onUpdateIsColorPickerActive(false);
    if (selectedColor && !compareColors(selectedColor, previousColor)) {
      onUpdateColorPallete(
        `rgb(${selectedColor?.r}, ${selectedColor?.g}, ${selectedColor?.b})`
      );
      setPreviousColor(selectedColor);
    }
  };

  return (
    <div
      id="colorPicker"
      className={`absolute ${colIndex % 5 > 2 ? "right-0" : "left-0"}`}
    >
      <div
        className="fixed bottom-0 left-0 right-0 top-0"
        onClick={handleClose}
      />
      <div className="relative z-10">
        <ChromePicker
          color={selectedColor}
          onChange={handleChangeComplete}
          disableAlpha={true}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
