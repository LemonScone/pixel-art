import React from "react";

type PixelProps = {
  id: number;
  color: string;
  columns: number;
  toolActive: boolean;
  onPointerDown: (id: number) => void;
  onToolActive: (down: boolean) => void;
};

const Pixel = ({
  id,
  color,
  columns,
  toolActive,
  onPointerDown,
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

  return (
    <div
      className={`pixel w-[calc(100%/${columns})] h-100 border-r border-b border-neutral-500 hover:bg-zinc-500 transition-all bg-neutral-600`}
      style={{ backgroundColor: color }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => {
        onToolActive(false);
      }}
    ></div>
  );
};

export default Pixel;
