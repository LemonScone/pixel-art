import { screen } from "@testing-library/react";
import { render } from "../utils/test-utils";
import { vi } from "vitest";

import ColorPallete from "./ColorPallete";
import { INITIAL_TOOL_OPTIONS, INITIAL_COLOR_PALLETE } from "../constants";

const renderComponent = () => {
  const onUpdateToolOptions = vi.fn();
  const onUpdateSelectedTool = vi.fn();

  render(
    <ColorPallete
      toolOptions={INITIAL_TOOL_OPTIONS}
      onUpdateToolOptions={onUpdateToolOptions}
      onUpdateSelectedTool={onUpdateSelectedTool}
    />
  );
};

describe("ColorPallete", () => {
  describe("when rendered", () => {
    it("should render color pallete", () => {
      renderComponent();

      const colorSwatches = screen.getAllByTestId("colorswatch");
      expect(colorSwatches.length).toBe(INITIAL_COLOR_PALLETE.length);
    });

    it("should render color add button", () => {
      renderComponent();

      const colorAddButton = screen.getByText(/✚/i);
      expect(colorAddButton).toBeInTheDocument();
    });
  });
});
