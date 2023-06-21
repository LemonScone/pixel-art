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
    }
  };

  const handlePointerEnter = (id: number) => {
    if (ref.current) {
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
  };

  const handlePointerLeave = (id: number) => {
    if (ref.current) {
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
  };

  const colPixels = Array.from({ length: columns });
  const rowPixels = Array.from({ length: rows });

  return (
    <div
      ref={ref}
      className="flex h-full w-full cursor-cell flex-wrap items-start shadow-2xl"
    >
      {rowPixels.map((row, rowIdx) => {
        return colPixels.map((col, colIdx) => {
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
        });
      })}
    </div>
  );
};

export default PixelContainer;
