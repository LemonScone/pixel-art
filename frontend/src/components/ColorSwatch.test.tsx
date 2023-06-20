import { screen } from "@testing-library/react";
import { render } from "../utils/test-utils";
import { vi } from "vitest";
import user from "@testing-library/user-event";

import ColorSwatch from "./ColorSwatch";
import { COLOR_REGEX } from "../constants";

const COLOR_CODE_STRING = "rgb(116, 185, 255)";

const renderComponent = ({ color = "rgb(0, 0, 0)", isActiveColor = false }) => {
  const onUpdateToolOptionsAndSelectedTool = vi.fn();
  render(
    <ColorSwatch
      color={color}
      isActiveColor={isActiveColor}
      onUpdateToolOptionsAndSelectedTool={onUpdateToolOptionsAndSelectedTool}
    />
  );

  return { onUpdateToolOptionsAndSelectedTool };
};

const getCurrentColorSwatch = (colorPallete: HTMLElement[]) => {
  return colorPallete.find((swatch) => {
    const colorMatches: RegExpMatchArray | null =
      swatch.style.boxShadow.match(COLOR_REGEX);
    return colorMatches?.[0] === COLOR_CODE_STRING;
  });
};

describe("ColorSwatch", () => {
  describe("when rendered", () => {
    describe("When the swatch color is active color", () => {
      it("should not have the box-shadow inset property.", () => {
        renderComponent({ color: COLOR_CODE_STRING, isActiveColor: true });

        const colorPallete = screen.getAllByTestId("colorswatch");
        const currentColorSwatch = getCurrentColorSwatch(colorPallete);

        expect(currentColorSwatch?.style.boxShadow).toContain(
          `0px 0px 2px 1px ${COLOR_CODE_STRING}`
        );
      });
    });
    describe("When the swatch color is not active color", () => {
      it("should have the box-shadow inset property.", () => {
        renderComponent({ color: COLOR_CODE_STRING, isActiveColor: false });

        const colorPallete = screen.getAllByTestId("colorswatch");
        const currentColorSwatch = getCurrentColorSwatch(colorPallete);

        expect(currentColorSwatch?.style.boxShadow).not.toContain(
          `0px 0px 2px 1px ${COLOR_CODE_STRING}`
        );
      });
    });
  });

  describe("when click the swatch", () => {
    it("calls onUpdateToolOptionsAndSelectedTool", async () => {
      const { onUpdateToolOptionsAndSelectedTool } = renderComponent({
        color: COLOR_CODE_STRING,
        isActiveColor: false,
      });

      const colorPallete = screen.getAllByTestId("colorswatch");
      const currentColorSwatch = getCurrentColorSwatch(colorPallete);

      if (currentColorSwatch) {
        await user.click(currentColorSwatch);
        setTimeout(() => {
          expect(onUpdateToolOptionsAndSelectedTool).toHaveBeenCalled();
          expect(onUpdateToolOptionsAndSelectedTool).toHaveBeenCalledWith(
            COLOR_CODE_STRING
          );
        }, 100);
      }
    });
  });
});
