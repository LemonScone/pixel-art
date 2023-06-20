import { screen } from "@testing-library/react";
import { render } from "../utils/test-utils";
import { vi } from "vitest";
import user from "@testing-library/user-event";

import ColorSwatch from "./ColorSwatch";

const COLOR_CODE_STRING = "rgb(116, 185, 255)";

const renderComponent = ({ color = "rgb(0, 0, 0)", isActiveColor = false }) => {
  const onChangeToolOptionsAndSelectedTool = vi.fn();
  render(
    <ColorSwatch
      color={color}
      isActiveColor={isActiveColor}
      onChangeToolOptionsAndSelectedTool={onChangeToolOptionsAndSelectedTool}
    />
  );

  return { onChangeToolOptionsAndSelectedTool };
};

describe("ColorSwatch", () => {
  describe("when rendered", () => {
    describe("When the swatch color is active color", () => {
      it("should not have the box-shadow inset property.", () => {
        renderComponent({ color: COLOR_CODE_STRING, isActiveColor: true });
        const colorSwatch = screen.getByRole("button", {
          name: /color swatch/i,
        });

        expect(colorSwatch).toHaveStyle(
          `box-shadow: ${COLOR_CODE_STRING} 0px 0px 2px 1px, ${COLOR_CODE_STRING} 0px 0px 0px 4px inset`
        );
      });
    });
    describe("When the swatch color is not active color", () => {
      it("should have the box-shadow inset property.", () => {
        renderComponent({ color: COLOR_CODE_STRING, isActiveColor: false });
        const colorSwatch = screen.getByRole("button", {
          name: /color swatch/i,
        });

        expect(colorSwatch).toHaveStyle(
          `box-shadow: ${COLOR_CODE_STRING} 0px 0px 0px 18px inset`
        );
      });
    });
  });

  describe("when click the swatch", () => {
    it("calls onChangeToolOptionsAndSelectedTool", async () => {
      const { onChangeToolOptionsAndSelectedTool } = renderComponent({
        color: COLOR_CODE_STRING,
        isActiveColor: false,
      });

      const colorSwatch = screen.getByRole("button", {
        name: /color swatch/i,
      });

      if (colorSwatch) {
        await user.click(colorSwatch);
        setTimeout(() => {
          expect(onChangeToolOptionsAndSelectedTool).toHaveBeenCalled();
          expect(onChangeToolOptionsAndSelectedTool).toHaveBeenCalledWith(1);
        }, 100);
      }
    });
  });
});
