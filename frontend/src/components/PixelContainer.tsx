import React, { Dispatch, useCallback, useRef, useState } from "react";

import Pixel from "./Pixel";

import useOutsidePointerUp from "../hooks/useOutsidePointerUp";
import { getGridBackgroundHoverColor, getTargetIndexes } from "../utils/grid";
import { getHoverColor } from "../utils/color";

import type { ToolOption, Tool } from "../types/Tool";
import { ToolActionKind } from "../constants/actionTypes";
import { Actions } from "../reducers/gridReducer";

type PixelContainerProps = {
  columns: number;
  rows: number;
  grid: string[];
  toolOptions: ToolOption;
  selectedTool: Tool;
  dispatch: Dispatch<Actions>;
};

const PixelContainer = ({
  columns,
  rows,
  grid,
  toolOptions,
  selectedTool,
  dispatch,
}: PixelContainerProps) => {
  const toolActiveRef = useRef(false);
  const moveCoordinateRef = useRef({
    clientX: 0,
    clientY: 0,
    cellWidth: 0,
  });

  const ref = useOutsidePointerUp(() => {
    toolActiveRef.current = false;
  });

  const handlePointerDown = useCallback(
    (id: number) => {
      if (selectedTool === "pen") {
        dispatch({
          type: ToolActionKind.PENCIL,
          payload: {
            pen: {
              color: toolOptions.pen.color,
              size: toolOptions.pen.size,
            },
            id,
          },
        });
      } else if (selectedTool === "eraser") {
        dispatch({
          type: ToolActionKind.ERASER,
          payload: {
            eraser: {
              size: toolOptions.eraser.size,
            },
            id,
          },
        });
      } else if (selectedTool === "bucket") {
        dispatch({
          type: ToolActionKind.BUCKET,
          payload: {
            pen: {
              color: toolOptions.pen.color,
            },
            id,
          },
        });
      }

      toolActiveRef.current = true;
    },
    [dispatch, selectedTool, toolOptions]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, id: number) => {
      if (
        (selectedTool === "pen" || selectedTool === "eraser") &&
        toolActiveRef.current
      ) {
        //setMoveIndex(id);
        handlePointerDown(id);
      }

      if (selectedTool === "move" && toolActiveRef.current) {
        const xDiff = e.clientX - moveCoordinateRef.current.clientX;
        const yDiff = e.clientY - moveCoordinateRef.current.clientY;

        dispatch({
          type: ToolActionKind.MOVE,
          payload: {
            xDiff,
            yDiff,
            cellWidth: moveCoordinateRef.current.cellWidth,
          },
        });

        if (
          Math.abs(xDiff) > moveCoordinateRef.current.cellWidth ||
          Math.abs(yDiff) > moveCoordinateRef.current.cellWidth
        ) {
          moveCoordinateRef.current.clientX = e.clientX;
          moveCoordinateRef.current.clientY = e.clientY;
        }
      }
    },
    [handlePointerDown, dispatch, selectedTool]
  );

  const handlePointerEnter = useCallback(
    (id: number) => {
      if (ref.current) {
        if (selectedTool === "pen" || selectedTool === "eraser") {
          const indexes = getTargetIndexes(
            id,
            toolOptions[selectedTool].size,
            columns,
            rows
          );
          const pixels = ref.current.querySelectorAll<HTMLDivElement>(".pixel");
          indexes.forEach((index) => {
            const painted = pixels[index].dataset.color;

            let hoverColor = "";
            if (painted) {
              hoverColor = getHoverColor(painted);
            } else {
              const gridBgIdx = pixels[index].dataset.gridBgIdx;
              hoverColor = getGridBackgroundHoverColor(gridBgIdx as string);
            }
            pixels[index].style.backgroundColor = hoverColor;
          });
        }
      }
    },
    [columns, rows, ref, selectedTool, toolOptions]
  );

  const handlePointerLeave = useCallback(
    (id: number) => {
      if (ref.current) {
        if (selectedTool === "pen" || selectedTool === "eraser") {
          const indexes = getTargetIndexes(
            id,
            toolOptions[selectedTool].size,
            columns,
            rows
          );
          const pixels = ref.current.querySelectorAll<HTMLDivElement>(".pixel");
          indexes.forEach((index) => {
            const paintedColor = pixels[index].dataset.color;
            pixels[index].style.backgroundColor = paintedColor ?? "";
          });
        }
      }
    },
    [columns, rows, ref, selectedTool, toolOptions]
  );

  const handlePointerUp = useCallback(() => {
    toolActiveRef.current = false;
  }, []);

  const colPixels = React.useMemo(
    () => Array.from({ length: columns }),
    [columns]
  );
  const rowPixels = React.useMemo(() => Array.from({ length: rows }), [rows]);

  const handleMovePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (selectedTool === "move") {
      const target = e.target as HTMLDivElement;

      if (target?.hasPointerCapture(e.pointerId)) {
        target?.releasePointerCapture(e.pointerId);
      }

      moveCoordinateRef.current.clientX = e.clientX;
      moveCoordinateRef.current.clientY = e.clientY;
      moveCoordinateRef.current.cellWidth = target.clientWidth;

      toolActiveRef.current = true;
    }
  };

  return (
    <div
      ref={ref}
      onPointerDown={handleMovePointerDown}
      onPointerUp={() => {
        toolActiveRef.current = false;
      }}
      className={`flex h-full w-full ${
        selectedTool === "move" ? "cursor-move" : "cursor-cell"
      } flex-wrap items-start shadow-2xl`}
    >
      {rowPixels.map((row, rowIdx) => {
        return colPixels.map((col, colIdx) => {
          const id = rowIdx * colPixels.length + colIdx;
          const color = grid[id];
          return (
            <Pixel
              key={id}
              id={id}
              rowIdx={rowIdx}
              columns={columns}
              color={color}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            />
          );
        });
      })}
    </div>
  );
};

export default PixelContainer;
