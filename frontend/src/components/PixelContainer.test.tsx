import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MockPointerEvent from "../../__mocks__/MockPointerEvent";

import PixelContainer from "./PixelContainer";

import { Tool } from "../types/Tool";

import { INITIAL_TOOL_OPTIONS } from "../constants";

describe("PixelContainer", () => {
  beforeEach(() => {
    window.PointerEvent = MockPointerEvent as any;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  const renderPixels = ({
    columns = 25,
    rows = 25,
    grid = Array(25).fill(""),
    toolOptions = INITIAL_TOOL_OPTIONS,
    onUpdateGrid = (newGrid: string[]) => {
      /* */
    },
    selectedTool = "pen" as Tool,
  }) => {
    render(
      <PixelContainer
        columns={columns}
        rows={rows}
        grid={grid}
        toolOptions={toolOptions}
        onUpdateGrid={onUpdateGrid}
        selectedTool={selectedTool}
      />
    );
  };

  it("should render a grid of pixels", () => {
    const columns = 16;
    const rows = 16;
    renderPixels({ columns, rows });

    const pixels = screen.getAllByTestId("pixel");
    expect(pixels.length).toBe(columns * rows);
  });

  describe("Drawing with a pen", () => {
    let GRID = Array(25).fill("");

    const onUpdateGrid = (newGrid: string[]) => {
      GRID = newGrid;
    };

    const getToolOptionsWithPenSize = (size: number) => {
      return {
        ...INITIAL_TOOL_OPTIONS,
        pen: {
          color: "rgb(54, 255, 121)",
          size,
        },
      };
    };

    describe("When the pen size is 1", () => {
      const size = 1;
      const toolOptions = getToolOptionsWithPenSize(size);

      it("should update the color of 1 pixel", () => {
        renderPixels({
          toolOptions,
          onUpdateGrid,
        });

        const pixels = screen.getAllByTestId("pixel");

        const pixel = pixels[0];

        fireEvent.pointerDown(pixel);

        expect(GRID[0]).toBe(toolOptions.pen.color);
      });

      describe("When the pen size is 2", () => {
        const size = 2;
        const toolOptions = getToolOptionsWithPenSize(size);

        it("should update the color of 4 pixel", () => {
          renderPixels({
            toolOptions,
            onUpdateGrid,
          });

          const pixels = screen.getAllByTestId("pixel");

          const pixel = pixels[0];

          fireEvent.pointerDown(pixel);

          expect(
            GRID.filter((pixel) => pixel === toolOptions.pen.color).length
          ).toBe(size ** 2);
        });
      });

      describe("When the pen size is 3", () => {
        const size = 3;
        const toolOptions = getToolOptionsWithPenSize(size);

        it("should update the color of 9 pixel", () => {
          renderPixels({
            toolOptions,
            onUpdateGrid,
          });

          const pixels = screen.getAllByTestId("pixel");

          const pixel = pixels[0];

          fireEvent.pointerDown(pixel);

          expect(
            GRID.filter((pixel) => pixel === toolOptions.pen.color).length
          ).toBe(size ** 2);
        });
      });

      describe("When the pen size is 4", () => {
        const size = 4;
        const toolOptions = getToolOptionsWithPenSize(size);

        it("should update the color of 16 pixel", () => {
          renderPixels({
            toolOptions,
            onUpdateGrid,
          });

          const pixels = screen.getAllByTestId("pixel");

          const pixel = pixels[0];

          fireEvent.pointerDown(pixel);

          expect(
            GRID.filter((pixel) => pixel === toolOptions.pen.color).length
          ).toBe(size ** 2);
        });
      });

      describe("When the pen size is 5", () => {
        const size = 5;
        const toolOptions = getToolOptionsWithPenSize(size);

        it("should update the color of 25 pixel", () => {
          renderPixels({
            toolOptions,
            onUpdateGrid,
          });

          const pixels = screen.getAllByTestId("pixel");

          const pixel = pixels[0];

          fireEvent.pointerDown(pixel);

          expect(
            GRID.filter((pixel) => pixel === toolOptions.pen.color).length
          ).toBe(size ** 2);
        });
      });
    });
  });

  describe("Paint with a bucket", () => {
    const INIT_COLOR = "rgb(116, 185, 255)";
    let GRID = [
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

    const onUpdateGrid = (newGrid: string[]) => {
      GRID = newGrid;
    };

    const getToolOptionsWithPenSize = (size: number) => {
      return {
        ...INITIAL_TOOL_OPTIONS,
        pen: {
          color: "rgb(54, 255, 121)",
          size,
        },
      };
    };

    const toolOptions = getToolOptionsWithPenSize(1);

    it("should update the color INIT_COLOR(rgb(116, 185, 255)) should be changed to pen.color(rgb(54, 255, 121))", () => {
      renderPixels({
        columns: 5,
        rows: 5,
        grid: GRID,
        toolOptions,
        onUpdateGrid,
        selectedTool: "bucket",
      });

      const pixels = screen.getAllByTestId("pixel");

      const pixel = pixels[0];

      const paintedCount = GRID.filter((color) => color === INIT_COLOR).length;

      fireEvent.pointerDown(pixel);

      const updatedCount = GRID.filter(
        (color) => color === toolOptions.pen.color
      ).length;

      expect(paintedCount).toEqual(updatedCount);
    });
  });
});
