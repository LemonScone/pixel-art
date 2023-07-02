import React from "react";
import { getGridBackgroundIndex } from "../utils/grid";
import { Indexable } from "../types/Indexable";

type PixelProps = {
  id: number;
  color: string;
  rowIdx: number;
  columns: number;
};

const gridBackgroundColor: Indexable<string> = {
  0: "bg-[#d9d9d9]",
  1: "bg-white",
};

const Pixel = React.memo(({ id, color, rowIdx, columns }: PixelProps) => {
  const gridBgIdx = getGridBackgroundIndex(id, columns, rowIdx);
  return (
    <div
      aria-label="pixel"
      data-id={id}
      data-color={color}
      data-grid-bg-idx={gridBgIdx}
      className={`pixel w-[calc(100%/${columns})] pb-[calc(100%/${columns})] border-neutral-500 ${gridBackgroundColor[gridBgIdx]}`}
      style={{ backgroundColor: color }}
    ></div>
  );
});
export default Pixel;
