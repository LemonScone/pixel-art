import { GridSizeActionKind, ToolActionKind } from "../constants/actionTypes";
import { NestedPartial } from "../types/NestedPartial";
import { ToolOption } from "../types/Tool";
import {
  getBucketFillGridAndIndexes,
  getMoveIndexes,
  getTargetIndexes,
  resizeGrid,
} from "../utils/grid";

interface GridState {
  grid: string[];
  columns: number;
  rows: number;
}

type ToolAction = {
  type: ToolActionKind;
  payload: NestedPartial<ToolOption> & {
    id?: number;
    xDiff?: number;
    yDiff?: number;
    cellWidth?: number;
  };
};

type GridSizeAction = {
  type: GridSizeActionKind;
};

type Actions = GridSizeAction | ToolAction;

const gridReducer = (state: GridState, action: Actions) => {
  switch (action.type) {
    case ToolActionKind.PENCIL: {
      const newGrid = state.grid.slice();

      if (action.payload && action.payload.id && action.payload.pen) {
        const { pen } = action.payload;
        const color = pen.color as string;
        const size = pen.size as number;

        const targetIndexes = getTargetIndexes(
          action.payload.id,
          size,
          state.columns,
          state.rows
        );

        targetIndexes.forEach((idx) => {
          newGrid[idx] = color;
        });
      }
      return {
        ...state,
        grid: newGrid,
      };
    }
    case ToolActionKind.ERASER: {
      const newGrid = state.grid.slice();

      if (action.payload && action.payload.id && action.payload.eraser) {
        const size = action.payload.eraser.size as number;

        const targetIndexes = getTargetIndexes(
          action.payload.id,
          size,
          state.columns,
          state.rows
        );
        targetIndexes.forEach((idx) => {
          newGrid[idx] = "";
        });
      }

      return {
        ...state,
        grid: newGrid,
      };
    }
    case ToolActionKind.BUCKET: {
      const newGrid = state.grid.slice();
      if (action.payload && action.payload.id && action.payload.pen) {
        const originColor = state.grid[action.payload.id] as string;
        const newColor = action.payload.pen.color as string;
        const { grid } = getBucketFillGridAndIndexes(
          newGrid,
          action.payload.id,
          originColor,
          newColor,
          state.columns,
          state.rows
        );
        return {
          ...state,
          grid,
        };
      }
      return {
        ...state,
        grid: newGrid,
      };
    }

    case ToolActionKind.MOVE: {
      const { grid, rows, columns } = state;
      let newGrid = grid.slice();
      if (
        action.payload &&
        action.payload.xDiff &&
        action.payload.yDiff &&
        action.payload.cellWidth
      ) {
        const { xDiff, yDiff, cellWidth } = action.payload;
        const size = rows * columns;
        const HORIZONTAL_DIRECTION =
          Math.abs(xDiff) > cellWidth ? (xDiff < 0 ? "LEFT" : "RIGHT") : "";
        const VERTICAL_DIRECTION =
          Math.abs(yDiff) > cellWidth ? (yDiff < 0 ? "UP" : "DOWN") : "";

        switch (HORIZONTAL_DIRECTION) {
          case "LEFT": {
            const targetIndexes = getMoveIndexes(0, columns, size);
            targetIndexes?.forEach((idx) => {
              const originPixel = newGrid[idx];
              newGrid.splice(idx, 1);
              newGrid.splice(idx + columns - 1, 0, originPixel);
            });
            break;
          }
          case "RIGHT": {
            const targetIndexes = getMoveIndexes(
              columns - 1,
              columns,
              rows * columns
            );
            targetIndexes?.forEach((idx) => {
              const originPixel = newGrid[idx];
              newGrid.splice(idx, 1);
              newGrid.splice(idx - columns + 1, 0, originPixel);
            });
            break;
          }
          default:
        }

        switch (VERTICAL_DIRECTION) {
          case "UP": {
            newGrid = newGrid
              .slice(columns, rows * columns)
              .concat(newGrid.slice(0, columns));
            break;
          }
          case "DOWN": {
            const lastRowStartIndexes = size - columns;
            newGrid = newGrid
              .slice(lastRowStartIndexes, lastRowStartIndexes + columns)
              .concat(newGrid.slice(0, lastRowStartIndexes));
            break;
          }
          default:
        }
      }
      return {
        ...state,
        grid: newGrid,
      };
    }

    case GridSizeActionKind.INCREASE_COLUMN:
      return {
        ...state,
        grid: resizeGrid(
          state.grid,
          state.rows,
          state.columns,
          state.rows,
          state.columns + 1
        ),
        columns: state.columns + 1,
      };
    case GridSizeActionKind.DECREASE_COLUMN:
      return {
        ...state,
        grid: resizeGrid(
          state.grid,
          state.rows,
          state.columns,
          state.rows,
          state.columns - 1
        ),
        columns: state.columns - 1,
      };
    case GridSizeActionKind.INCREASE_ROW:
      return {
        ...state,
        grid: resizeGrid(
          state.grid,
          state.rows,
          state.columns,
          state.rows + 1,
          state.columns
        ),
        rows: state.rows + 1,
      };
    case GridSizeActionKind.DECREASE_ROW:
      return {
        ...state,
        grid: resizeGrid(
          state.grid,
          state.rows,
          state.columns,
          state.rows - 1,
          state.columns
        ),
        rows: state.rows - 1,
      };
    default:
      return state;
  }
};

export type { ToolAction, Actions };
export default gridReducer;
