import { GRID_HOVER_COLOR_FIRST, GRID_HOVER_COLOR_SECOND } from "../constants";

export const resizeGrid = (
  grid: string[],
  originRows: number,
  originColumns: number,
  newRows: number,
  newColumns: number
) => {
  let newGrid = grid;
  const originCells = originRows * originColumns;

  if (originColumns !== newColumns) {
    // resize by columns
    const diff = Math.abs(newColumns - originColumns);
    const increment = newColumns - originColumns > 0;
    if (increment) {
      for (let i = originCells; i > 0; i -= originColumns) {
        const pixels = Array(diff).fill("");
        newGrid = [...newGrid.slice(0, i), ...pixels, ...newGrid.slice(i)];
      }
    } else {
      for (let i = originCells - 1; i > 0; i -= originColumns) {
        for (let j = 0; j < diff; j++) {
          newGrid = [...newGrid.slice(0, i - j), ...newGrid.slice(i + 1 - j)];
        }
      }
    }
  }

  if (originRows !== newRows) {
    // resize by rows
    const diff = Math.abs(newRows - originRows);
    const increment = newRows - originRows > 0;
    if (increment) {
      for (let i = 0; i < newColumns; i++) {
        const pixels = Array(diff).fill("");
        newGrid = [...newGrid, ...pixels];
      }
    } else {
      for (let i = 0; i < newColumns; i++) {
        for (let j = 0; j < diff; j++) {
          newGrid = newGrid.slice(0, -1);
        }
      }
    }
  }

  return newGrid;
};

export const getTargetIndexes = (
  start: number,
  size: number,
  columns: number,
  rows: number
) => {
  const indexes = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const value = start + columns * i + j;
      if (value >= columns * rows) {
        break;
      }
      indexes.push(value);
      if ((value + 1) % columns === 0) {
        break;
      }
    }
  }

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
