import React, { useCallback, useRef } from "react";

import Pixel from "./Pixel";

import useOutsidePointerUp from "../hooks/useOutsidePointerUp";
import { getGridBackgroundHoverColor, getTargetIndexes } from "../utils/grid";
import { getHoverColor } from "../utils/color";

import {
  applyBucket,
  applyEraser,
  applyMove,
  applyPencil,
  selectFrame,
} from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

const PixelContainer = () => {
  const dispatch = useAppDispatch();
  const { project, selectedTool, options } = useAppSelector(
    (state) => state.projects
  );
  const frame = useAppSelector(selectFrame);

  const grid = frame.grid;
  const columns = project.gridColumns;
  const rows = project.gridRows;

  const toolActiveRef = useRef(false);
  const moveCoordinateRef = useRef({
    clientX: 0,
    clientY: 0,
    cellWidth: 0,
  });

  const previousMoveIndexRef = useRef(-1);

  const ref = useOutsidePointerUp(() => {
    toolActiveRef.current = false;
  });

  const dispatchGrid = useCallback(
    (id: number) => {
      if (selectedTool === "pen") {
        dispatch(applyPencil(id));
      } else if (selectedTool === "eraser") {
        dispatch(applyEraser(id));
      } else if (selectedTool === "bucket") {
        dispatch(applyBucket(id));
      }
    },
    [dispatch, selectedTool]
  );

  const setHoverColorById = useCallback(
    (id: number) => {
      if (ref.current) {
        if (selectedTool === "pen" || selectedTool === "eraser") {
          const indexes = getTargetIndexes(
            id,
            options[selectedTool].size,
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
    [columns, rows, ref, selectedTool, options]
  );

  const clearHoverColorById = useCallback(
    (id: number) => {
      if (ref.current) {
        if (selectedTool === "pen" || selectedTool === "eraser") {
          const indexes = getTargetIndexes(
            id,
            options[selectedTool].size,
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
    [columns, rows, ref, selectedTool, options]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      if (target?.hasPointerCapture(e.pointerId)) {
        target?.releasePointerCapture(e.pointerId);
      }

      if (!target.dataset.id) {
        return;
      }

      const id = +target.dataset.id;

      if (selectedTool === "move") {
        moveCoordinateRef.current = {
          clientX: e.clientX,
          clientY: e.clientY,
          cellWidth: target.clientWidth,
        };
      } else {
        dispatchGrid(id);
      }

      toolActiveRef.current = true;
    },
    [dispatchGrid, selectedTool]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;

      if (!target.dataset.id) {
        return;
      }

      const id = +target.dataset.id;

      if (
        (selectedTool === "pen" || selectedTool === "eraser") &&
        previousMoveIndexRef.current !== id
      ) {
        if (previousMoveIndexRef.current > -1) {
          clearHoverColorById(previousMoveIndexRef.current);
        }
        setHoverColorById(id);

        if (toolActiveRef.current) {
          dispatchGrid(id);
        }

        previousMoveIndexRef.current = id;
      }

      if (selectedTool === "move" && toolActiveRef.current) {
        const { clientX, clientY, cellWidth } = moveCoordinateRef.current;
        const xDiff = e.clientX - clientX;
        const yDiff = e.clientY - clientY;
        dispatch(applyMove({ xDiff, yDiff, cellWidth }));

        if (Math.abs(xDiff) > cellWidth || Math.abs(yDiff) > cellWidth) {
          moveCoordinateRef.current.clientX = e.clientX;
          moveCoordinateRef.current.clientY = e.clientY;
        }
      }
    },
    [
      dispatch,
      dispatchGrid,
      setHoverColorById,
      clearHoverColorById,
      selectedTool,
    ]
  );

  const handlePointerUp = useCallback(() => {
    toolActiveRef.current = false;
  }, []);

  const handlePointerLeave = () => {
    if (previousMoveIndexRef.current > -1) {
      clearHoverColorById(previousMoveIndexRef.current);
      previousMoveIndexRef.current = -1;
    }
  };

  const colPixels = React.useMemo(
    () => Array.from({ length: columns }),
    [columns]
  );
  const rowPixels = React.useMemo(() => Array.from({ length: rows }), [rows]);

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`flex h-full w-full ${
        selectedTool === "move" ? "cursor-move" : "cursor-cell"
      } flex-wrap items-start shadow-2xl`}
    >
      {rowPixels.map((_, rowIdx) => {
        return colPixels.map((_, colIdx) => {
          const id = rowIdx * colPixels.length + colIdx;
          const color = grid[id];
          return (
            <Pixel
              key={id}
              id={id}
              rowIdx={rowIdx}
              columns={columns}
              color={color}
            />
          );
        });
      })}
    </div>
  );
};

export default PixelContainer;
