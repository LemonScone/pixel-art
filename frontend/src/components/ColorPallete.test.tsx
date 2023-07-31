import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";

import ColorPallete from "./ColorPallete";
import { INITIAL_COLOR_PALLETE } from "../constants";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  renderWithProviders(<ColorPallete />, {
    preloadedState: {
      projects: {
        present: { ...projectsStore, selectedTool: "pen" },
        past: [],
        future: [],
      },
    },
  });
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

    it("should render color add button", () => {
      renderComponent();

      const colorAddButton = screen.getByRole("button", {
        name: /add new color/i,
      });
      expect(colorAddButton).toBeInTheDocument();
    });
  });
});
