import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { vi } from "vitest";

import ColorSwatch from "./ColorSwatch";
import projectsStore from "../tests/fixtures/projectsStore";

const COLOR_CODE_STRING = "rgb(116, 185, 255)";
const renderComponent = ({ color = "rgb(0, 0, 0)" }) => {
  const onChangeToolOptionsAndSelectedTool = vi.fn();
  renderWithProviders(<ColorSwatch color={color} />, {
    preloadedState: {
      projects: {
        ...projectsStore,
        selectedTool: "pen",
        options: {
          ...projectsStore.options,
          pen: { color: COLOR_CODE_STRING, size: 1 },
        },
      },
    },
  });

  return { onChangeToolOptionsAndSelectedTool };
};

describe("ColorSwatch", () => {
  describe("when rendered", () => {
    describe("When the swatch color is active color", () => {
      it("should not have the box-shadow inset property.", () => {
        renderComponent({ color: COLOR_CODE_STRING });
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
        const ANOTHER_COLOR_CODE_STRING = "rgb(0, 0, 0)";
        renderComponent({ color: ANOTHER_COLOR_CODE_STRING });
        const colorSwatch = screen.getByRole("button", {
          name: /color swatch/i,
        });

        expect(colorSwatch).toHaveStyle(
          `box-shadow: ${ANOTHER_COLOR_CODE_STRING} 0px 0px 0px 18px inset`
        );
      });
    });
  });
});
