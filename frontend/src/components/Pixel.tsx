import React from "react";
import { getGridBackgroundIndex } from "../utils/grid";
import { Indexable } from "../types/Indexable";

type PixelProps = {
  id: number;
  color: string;
  rowIdx: number;
  columns: number;
  toolActive: boolean;
  onPointerDown: (id: number) => void;
  onPointerEnter: (id: number) => void;
  onPointerLeave: (id: number) => void;
  onToolActive: (down: boolean) => void;
};

const Pixel = ({
  id,
  color,
  rowIdx,
  columns,
  toolActive,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onToolActive,
}: PixelProps) => {
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target?.hasPointerCapture(e.pointerId)) {
      target?.releasePointerCapture(e.pointerId);
    }

    onToolActive(true);
    onPointerDown(id);
  };

  const handlePointerMove = () => {
    if (toolActive) {
      onPointerDown(id);
    }
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
      data-grid-bg-idx={gridBgIdx}
      className={`pixel w-[calc(100%/${columns})] pb-[calc(100%/${columns})] border-neutral-500 ${gridBackgroundColor[gridBgIdx]}`}
      style={{ backgroundColor: color }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerUp={() => {
        onToolActive(false);
      }}
    ></div>
  );
};

export default Pixel;
