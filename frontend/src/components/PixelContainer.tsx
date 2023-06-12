import React, { useState } from "react";
import Pixel from "./Pixel";
import { getTargetIndexes } from "../utils/grid";
import type { ToolOption, Tool } from "../models";

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
  const [toolActive, setToolActive] = useState<boolean>(false);

  const handlePointerDown = (id: number) => {
    const color = toolOptions.pen.color;
    const size = toolOptions.pen.size;

    if (selectedTool === "pen") {
      const newGrid = grid.slice();
      const targetIndexes = getTargetIndexes(id, size, columns, rows);

      targetIndexes.forEach(idx => {
        newGrid[idx] = color;
      });

      onUpdateGrid(newGrid);
    } else if (selectedTool === "eraser") {
      // TODO: 지우개
    }
  };

  const colPixels = Array.from({ length: columns });
  const rowPixels = Array.from({ length: rows });

  return (
    <div className="w-full h-full flex flex-col border-t border-l shadow-2xl cursor-cell">
      {rowPixels.map((row, rowIdx) => {
        return (
          <div className={`flex basis-[calc(100%/${rows})]`} key={rowIdx}>
            {colPixels.map((col, colIdx) => {
              const id = rowIdx * colPixels.length + colIdx;
              return (
                <Pixel
                  key={id}
                  id={id}
                  columns={columns}
                  color={grid[id]}
                  toolActive={toolActive}
                  onPointerDown={handlePointerDown}
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
