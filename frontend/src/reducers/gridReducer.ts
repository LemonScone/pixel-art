import {
  GridSizeActionKind,
  ToolActionKind,
} from "../constants/actionTypes";
import { NestedPartial } from "../types/NestedPartial";
import { ToolOption } from "../types/Tool";
import {
  getBucketFillGridAndIndexes,
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
  payload: NestedPartial<ToolOption> & { id: number };
};

type GridSizeAction = {
  type: GridSizeActionKind;
};

type Actions =  GridSizeAction | ToolAction;

const gridReducer = (state: GridState, action: Actions) => {
  switch (action.type) {

    case ToolActionKind.PENCIL: {
      const newGrid = state.grid.slice();

      if (action.payload && action.payload.pen) {
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

      if (action.payload && action.payload.eraser) {
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
      if (action.payload && action.payload.pen) {
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
