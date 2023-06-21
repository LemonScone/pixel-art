import React, { useState } from "react";

import Pixel from "./Pixel";

import useOutsidePointerUp from "../hooks/useOutsidePointerUp";
import { getGridBackgroundHoverColor, getTargetIndexes } from "../utils/grid";
import { getHoverColor } from "../utils/color";

import type { ToolOption, Tool } from "../types/Tool";

type PixelContainerProps = {
  columns: number;
  rows: number;
  grid: string[];
  toolOptions: ToolOption;
  selectedTool: Tool;
  onUpdateGrid: (newGrid: string[]) => void;
};

const PixelContainer = ({
  columns,
  rows,
  grid,
  toolOptions,
  selectedTool,
  onUpdateGrid,
}: PixelContainerProps) => {
  const ref = useOutsidePointerUp(() => setToolActive(false));

  const [toolActive, setToolActive] = useState<boolean>(false);

  const handlePointerDown = (id: number) => {
    if (selectedTool === "pen") {
      const color = toolOptions.pen.color;
      const size = toolOptions.pen.size;
      const newGrid = grid.slice();
      const targetIndexes = getTargetIndexes(id, size, columns, rows);

      targetIndexes.forEach((idx) => {
        newGrid[idx] = color;
      });

      onUpdateGrid(newGrid);
    } else if (selectedTool === "eraser") {
      const size = toolOptions.eraser.size;
      const newGrid = grid.slice();
      const targetIndexes = getTargetIndexes(id, size, columns, rows);

      targetIndexes.forEach((idx) => {
        newGrid[idx] = "";
      });

      onUpdateGrid(newGrid);
    } else if (selectedTool === "bucket") {
      const cellColor = grid[id];
      const newGrid = grid.slice();
      const visited = new Array(columns * rows).fill(false);
      const queue: number[] = [id];

      while (queue.length > 0) {
        const pixelId: number = queue.shift();
        if (visited[pixelId]) continue;

        newGrid[pixelId] = toolOptions.pen.color;
        visited[pixelId] = true;

        const isNotRightmostPixel = (pixelId + 1) % columns !== 0;
        const isNotLeftmostPixel = pixelId % columns !== 0;
        const isNotTopRowPixel = pixelId >= columns;
        const isNotBottomRowPixel = pixelId < rows * columns - columns;

        if (isNotRightmostPixel && newGrid[pixelId + 1] === cellColor) {
          queue.push(pixelId + 1);
        }

        if (isNotLeftmostPixel && newGrid[pixelId - 1] === cellColor) {
          queue.push(pixelId - 1);
        }

        if (isNotTopRowPixel && newGrid[pixelId - columns] === cellColor) {
          queue.push(pixelId - columns);
        }

        if (isNotBottomRowPixel && newGrid[pixelId + columns] === cellColor) {
          queue.push(pixelId + columns);
        }
      }

      onUpdateGrid(newGrid);
    }
  };

  const handlePointerEnter = (id: number) => {
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
          const painted = grid[index];

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
  };

  const handlePointerLeave = (id: number) => {
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
          pixels[index].style.backgroundColor = grid[index];
        });
      }
    }
  };

  const colPixels = Array.from({ length: columns });
  const rowPixels = Array.from({ length: rows });

  return (
    <div
      ref={ref}
      className="flex h-full w-full cursor-cell flex-col border-l border-t shadow-2xl"
    >
      {rowPixels.map((row, rowIdx) => {
        return (
          <div className={`flex basis-[calc(100%/${rows})]`} key={rowIdx}>
            {colPixels.map((col, colIdx) => {
              const id = rowIdx * colPixels.length + colIdx;
              return (
                <Pixel
                  key={id}
                  id={id}
                  rowIdx={rowIdx}
                  columns={columns}
                  color={grid[id]}
                  toolActive={toolActive}
                  onPointerDown={handlePointerDown}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={handlePointerLeave}
                  onToolActive={setToolActive}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PixelContainer;
