import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";

import MockPointerEvent from "../tests/mocks/MockPointerEvent";

import PixelContainer from "./PixelContainer";

import { ToolOption } from "../types/Tool";

import { INITIAL_TOOL_OPTIONS } from "../constants";
import { renderWithProviders } from "../utils/test-utils";
import { Projects } from "../store/slices/projectsSlice";

import projectsStore, { exampleState } from "../tests/fixtures/projectsStore";

describe("PixelContainer", () => {
  beforeEach(() => {
    window.PointerEvent = MockPointerEvent as any;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  const renderPixels = ({
    initialState,
    selectedTool = "pen",
  }: {
    initialState?: Projects;
    selectedTool?: keyof ToolOption;
  }) => {
    let preloadedState;
    if (initialState) {
      preloadedState = { ...initialState, selectedTool };
    } else {
      preloadedState = { ...projectsStore, selectedTool };
    }
    renderWithProviders(<PixelContainer />, {
      preloadedState: {
        projects: preloadedState,
      },
    });
  };

  it("should render a grid of pixels", () => {
    const { data: project } = projectsStore;
    const columns = project.gridColumns;
    const rows = project.gridRows;
    renderPixels({});

    const pixels = screen.getAllByLabelText("pixel");
    expect(pixels.length).toBe(columns * rows);
  });

  describe("Drawing with a pen", () => {
    it("should call dispatch with toolOptions and id", () => {
      const id = 0;
      renderPixels({});

      const pixels = screen.getAllByLabelText("pixel");

      const pixel = pixels[id];

      fireEvent.pointerDown(pixel);

      expect(pixel).toHaveStyle(
        `background-color: ${INITIAL_TOOL_OPTIONS.pen.color}`
      );
    });
  });

  describe("Paint with a bucket", () => {
    const INIT_COLOR = "rgb(116, 185, 255)";
    const GRID = [
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      "",
      "",
      "",
      INIT_COLOR,
      INIT_COLOR,
      "",
      "",
      "",
      INIT_COLOR,
      INIT_COLOR,
      "",
      "",
      "",
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
      INIT_COLOR,
    ];

    it("should call dispatch with toolOptions and id", () => {
      const id = 0;
      renderPixels({
        initialState: exampleState(GRID, 5, 5),
        selectedTool: "bucket",
      });

      const pixels = screen.getAllByLabelText("pixel");

      const pixel = pixels[id];

      fireEvent.pointerDown(pixel);

      pixels.forEach((pixel, idx) => {
        if (GRID[idx]) {
          expect(pixel).toHaveStyle(
            `background-color: ${INITIAL_TOOL_OPTIONS.pen.color}`
          );
        }
      });
    });
  });
});
