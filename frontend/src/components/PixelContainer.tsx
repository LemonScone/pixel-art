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
  const ref = useOutsidePointerUp(() => setToolActive(false));
  const [moveIndex, setMoveIndex] = useState<number | null>(null);

  const [toolActive, setToolActive] = useState(false);

  const handleDrag = () => {
    if (!toolActive) {
      return;
    }

    if (!moveIndex) {
      return;
    }
    handlePointerDown(moveIndex);
  };

  const handlePointerMove = useCallback((id: number) => {
    setMoveIndex(id);
  }, []);

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
      } else if (selectedTool === "move") {
        dispatch({
          type: ToolActionKind.MOVE,
          payload: {id}
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

  return (
    <div
      ref={ref}
      className="flex h-full w-full cursor-cell flex-wrap items-start shadow-2xl"
      onPointerMove={handleDrag}
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
