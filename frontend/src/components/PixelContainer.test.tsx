import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MockPointerEvent from "../../__mocks__/MockPointerEvent";

import PixelContainer from "./PixelContainer";

import { Tool } from "../types/Tool";

import { INITIAL_TOOL_OPTIONS } from "../constants";
import { ToolActionKind } from "../constants/actionTypes";

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
    selectedTool = "pen" as Tool,
  }) => {
    const dispatch = vi.fn();
    render(
      <PixelContainer
        columns={columns}
        rows={rows}
        grid={grid}
        toolOptions={toolOptions}
        dispatch={dispatch}
        selectedTool={selectedTool}
      />
    );
    return { dispatch };
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

  it("should render a grid of pixels", () => {
    const columns = 16;
    const rows = 16;
    renderPixels({ columns, rows });

    const pixels = screen.getAllByLabelText("pixel");
    expect(pixels.length).toBe(columns * rows);
  });

  describe("Drawing with a pen", () => {
    it("should call dispatch with toolOptions and id", () => {
      const id = 0;
      const toolOptions = getToolOptionsWithPenSize(1);
      const { dispatch } = renderPixels({
        toolOptions,
      });

      const pixels = screen.getAllByLabelText("pixel");

      const pixel = pixels[id];

      fireEvent.pointerDown(pixel);

      expect(dispatch).toHaveBeenCalledWith({
        type: ToolActionKind.PENCIL,
        payload: {
          pen: {
            color: toolOptions.pen.color,
            size: toolOptions.pen.size,
          },
          id,
        },
      });
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

    const toolOptions = getToolOptionsWithPenSize(1);

    it("should call dispatch with toolOptions and id", () => {
      const id = 0;
      const { dispatch } = renderPixels({
        columns: 5,
        rows: 5,
        grid: GRID,
        toolOptions,
        selectedTool: "bucket",
      });

      const pixels = screen.getAllByLabelText("pixel");

      const pixel = pixels[id];

      fireEvent.pointerDown(pixel);

      expect(dispatch).toHaveBeenCalledWith({
        type: ToolActionKind.BUCKET,
        payload: {
          pen: {
            color: toolOptions.pen.color,
          },
          id,
        },
      });
    });
  });
});
