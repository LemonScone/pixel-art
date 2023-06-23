import React, { Dispatch, useCallback, useState } from "react";

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
  const [moveIndex, setMoveIndex] = useState<number | null>(null);
  const [toolActive, setToolActive] = useState(false);
  const [moveCoordinate, setMoveCoordinate] = useState({
    clientX: 0,
    clientY: 0,
    cellWidth: 0,
  });

  const handleDrag = () => {
    if (!toolActive) {
      return;
    }

    if (!moveIndex) {
      return;
    }

    handlePointerDown(moveIndex);
  };

  const ref = useOutsidePointerUp(() => {
    setToolActive(false);
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, id: number) => {
      setMoveIndex(id);

      if (selectedTool === "move" && toolActive) {
        const xDiff = e.clientX - moveCoordinate.clientX;
        const yDiff = e.clientY - moveCoordinate.clientY;

        dispatch({
          type: ToolActionKind.MOVE,
          payload: { xDiff, yDiff, cellWidth: moveCoordinate.cellWidth },
        });

        if (
          Math.abs(xDiff) > moveCoordinate.cellWidth ||
          Math.abs(yDiff) > moveCoordinate.cellWidth
        ) {
          setMoveCoordinate((prev) => ({
            ...prev,
            clientX: e.clientX,
            clientY: e.clientY,
          }));
        }
      }
    },
    [
      dispatch,
      selectedTool,
      toolActive,
      moveCoordinate.clientX,
      moveCoordinate.clientY,
      moveCoordinate.cellWidth,
    ]
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

      setToolActive(true);
    },
    [dispatch, selectedTool, toolOptions]
  );

  const handlePointerUp = useCallback(() => {
    setToolActive(false);
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

      setMoveCoordinate({
        clientX: e.clientX,
        clientY: e.clientY,
        cellWidth: target.clientWidth,
      });
      setToolActive(true);
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleDrag}
      onPointerDown={handleMovePointerDown}
      onPointerUp={() => {
        setToolActive(false);
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
