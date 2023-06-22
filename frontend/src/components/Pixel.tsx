import React from "react";
import { getGridBackgroundIndex } from "../utils/grid";
import { Indexable } from "../types/Indexable";

type PixelProps = {
  id: number;
  color: string;
  rowIdx: number;
  columns: number;
  onPointerDown: (id: number) => void;
  onPointerEnter: (id: number) => void;
  onPointerLeave: (id: number) => void;
  onPointerMove: (id: number) => void;
  onPointerUp: () => void;
};

const Pixel = React.memo(
  ({
    id,
    color,
    rowIdx,
    columns,
    onPointerDown,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    onPointerUp,
  }: PixelProps) => {

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;

      if (target?.hasPointerCapture(e.pointerId)) {
        target?.releasePointerCapture(e.pointerId);
      }
      onPointerDown(id);
    };

    const handlePointerMove = () => {
      onPointerMove(id);
    };

    const handlePointerEnter = () => {
      onPointerEnter(id);
    };

    const handlePointerLeave = () => {
      onPointerLeave(id);
    };

    const gridBackgroundColor: Indexable<string> = {
      0: "bg-[#d9d9d9]",
      1: "bg-white",
    };

    const gridBgIdx = getGridBackgroundIndex(id, columns, rowIdx);
    return (
      <div
        aria-label="pixel"
        data-color={color}
        data-grid-bg-idx={gridBgIdx}
        className={`pixel w-[calc(100%/${columns})] pb-[calc(100%/${columns})] border-neutral-500 ${gridBackgroundColor[gridBgIdx]}`}
        style={{ backgroundColor: color }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerUp={onPointerUp}
      ></div>
    );
  }
);
export default Pixel;
