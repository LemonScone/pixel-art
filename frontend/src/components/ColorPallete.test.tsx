import { screen } from "@testing-library/react";
import { render } from "../utils/test-utils";
import { vi } from "vitest";

import ColorPallete from "./ColorPallete";
import { INITIAL_COLOR_PALLETE } from "../constants";
import { ToolOption } from "../types/Tool";

const TOOL_OPTIONS: ToolOption = {
  pen: {
    color: "rgb(85, 239, 196)",
    size: 3,
  },
  eraser: {
    size: 1,
  },
  bucket: {},
  move: {},
};
const renderComponent = () => {
  const onChangeToolOptions = vi.fn();
  const onChangeSelectedTool = vi.fn();

  render(
    <ColorPallete
      selectedTool="pen"
      toolOptions={TOOL_OPTIONS}
      onChangeToolOptions={onChangeToolOptions}
      onChangeSelectedTool={onChangeSelectedTool}
    />
  );
};

describe("ColorPallete", () => {
  describe("when rendered", () => {
    it("should render color pallete", () => {
      renderComponent();

      const colorSwatches = screen.getAllByRole("button", {
        name: /color swatch/i,
      });

      expect(colorSwatches.length).toBe(INITIAL_COLOR_PALLETE.length);
    });

    it("should focusing active color", () => {
      renderComponent();

      const colorSwatches = screen.getAllByRole("button", {
        name: /color swatch/i,
      });

      const activeColor = colorSwatches.find((color) => {
        return color.style.boxShadow.includes(TOOL_OPTIONS.pen.color);
      });

      expect(activeColor).toHaveStyle(
        `box-shadow: ${TOOL_OPTIONS.pen.color} 0px 0px 2px 1px, ${TOOL_OPTIONS.pen.color} 0px 0px 0px 4px inset`
      );
    });

    it("should render color add button", () => {
      renderComponent();

      const colorAddButton = screen.getByRole("button", {
        name: /add new color/i,
      });
      expect(colorAddButton).toBeInTheDocument();
    });
  });
});
