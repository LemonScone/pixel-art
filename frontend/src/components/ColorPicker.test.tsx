//2. picker 클릭 시
//2-1. picker 사라져야 하고
//2-2. color pallete에 색깔 추가
//2-3. onUpdateToolOptions, onUpdateSelectedTool

import { render } from "@testing-library/react";
import ColorPicker from "./ColorPicker";
import { vi } from "vitest";

const COLOR_CODE_OBJECT = { r: 116, g: 185, b: 255 };

const renderComponent = () => {
  const onUpdateIsColorPickerActive = vi.fn();
  const onUpdateColorPallete = vi.fn();
  render(
    <ColorPicker
      activeColor={COLOR_CODE_OBJECT}
      onUpdateIsColorPickerActive={onUpdateIsColorPickerActive}
      onUpdateColorPallete={onUpdateColorPallete}
    />
  );

  return { onUpdateIsColorPickerActive, onUpdateColorPallete };
};

describe("ColorPicker", () => {
  describe("when rendered", () => {});
  describe("when click the color picker", () => {
    it("calls onUpdateIsColorPickerActive and onUpdateColorPallete", async () => {
      const { onUpdateIsColorPickerActive, onUpdateColorPallete } =
        renderComponent();

      //1. selectedColor 업데이트
    });
  });
  describe("when close the color picker", () => {
    it("calls onUpdateIsColorPickerActive and onUpdateColorPallete", async () => {
      const { onUpdateIsColorPickerActive, onUpdateColorPallete } =
        renderComponent();
      //0. 이전 색상과 다른 색상이 선택되어 있다면
      //1. color pallete에 색깔 추가하고
      //2. onUpdateToolOptions, onUpdateSelectedTool
      //3. previouseColor 업데이트
    });
  });
});
