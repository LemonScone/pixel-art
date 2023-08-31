import { flat, map, pipe, range, reject, takeUntil, toArray } from "@fxts/core";
import { GRID_HOVER_COLOR_FIRST, GRID_HOVER_COLOR_SECOND } from "../constants";

export const resizeGrid = (
  grid: string[],
  originRows: number,
  originColumns: number,
  newRows: number,
  newColumns: number
) => {
  let newGrid = grid;

  if (originColumns !== newColumns) {
    // resize by columns
    const diff = Math.abs(newColumns - originColumns);
    const increment = newColumns - originColumns > 0;
    if (increment) {
      newGrid = Array(grid.length + diff * originRows).fill("");
    } else {
      newGrid = grid.slice(0, grid.length - diff * originRows);
    }

    newGrid = newGrid.map((_, index) => {
      const col = index % newColumns;
      const row = Math.floor(index / newColumns);
      const originIndex = col + row * originColumns;

      if (
        col < (increment ? originColumns : newColumns) &&
        originIndex < grid.length
      ) {
        return grid[originIndex];
      } else {
        return "";
      }
    });
  }

  if (originRows !== newRows) {
    // resize by rows
    const diff = Math.abs(newRows - originRows);
    const increment = newRows - originRows > 0;
    if (increment) {
      const newPixels = Array(diff * newColumns).fill("");
      newGrid = [...newGrid, ...newPixels];
    } else {
      newGrid = newGrid.slice(0, newGrid.length - diff * newColumns);
    }
  }

  return newGrid;
};

export const getTargetIndexes = (
  startIndex: number,
  size: number,
  columns: number,
  rows: number
) => {
  const indexes = pipe(
    range(size),
    map((row) =>
      pipe(
        range(size),
        map((col) => columns * row + col),
        map((index) => index + startIndex),
        reject((index) => index >= columns * rows),
        takeUntil((index) => (index + 1) % columns === 0),
        toArray
      )
    ),
    flat,
    toArray
  );

  return indexes;
};

export const getGridBackgroundIndex = (
  id: number,
  columns: number,
  rowIdx: number
) => {
  let gridBgIdx = 0;

  if (columns % 2 === 0) {
    if (rowIdx % 2 === 0) {
      gridBgIdx = id % 2;
    } else {
      gridBgIdx = id % 2 === 0 ? 1 : 0;
    }
  } else {
    gridBgIdx = id % 2;
  }

  return gridBgIdx;
};

export const getGridBackgroundHoverColor = (gridBgIdx: string) => {
  return gridBgIdx === "0" ? GRID_HOVER_COLOR_FIRST : GRID_HOVER_COLOR_SECOND;
};

export const getBucketFillGridAndIndexes = (
  grid: string[],
  start: number,
  originColor: string,
  newColor: string,
  columns: number,
  rows: number
) => {
  const indexes = [];
  const visited = new Array(columns * rows).fill(false);
  const queue: number[] = [start];
  //TODO LinkedList로 수정해보기
  while (queue.length > 0) {
    const pixelId = queue.shift() as number;
    if (visited[pixelId]) continue;

    grid[pixelId] = newColor;
    indexes.push(pixelId);
    visited[pixelId] = true;

    const isNotRightmostPixel = (pixelId + 1) % columns !== 0;
    const isNotLeftmostPixel = pixelId % columns !== 0;
    const isNotTopRowPixel = pixelId >= columns;
    const isNotBottomRowPixel = pixelId < rows * columns - columns;

    if (isNotRightmostPixel && grid[pixelId + 1] === originColor) {
      queue.push(pixelId + 1);
    }

    if (isNotLeftmostPixel && grid[pixelId - 1] === originColor) {
      queue.push(pixelId - 1);
    }

    if (isNotTopRowPixel && grid[pixelId - columns] === originColor) {
      queue.push(pixelId - columns);
    }

    if (isNotBottomRowPixel && grid[pixelId + columns] === originColor) {
      queue.push(pixelId + columns);
    }
  }

  return { grid, indexes };
};

export const getMoveIndexes = (id: number, columns: number, size: number) => {
  let i = 0;
  const indexes = [];
  while (i < size) {
    if (i % columns === id) {
      indexes.push(i);
      i += columns;
    } else {
      i++;
    }
  }
  return indexes;
};

export const isGridsEqual = (originGrid: string[], newGrid: string[]) => {
  if (originGrid.length !== newGrid.length) {
    return false;
  }

  for (let i = 0; i < originGrid.length; i++) {
    if (originGrid[i] !== newGrid[i]) {
      return false;
    }
  }

  return true;
};
