import { GridActionKind } from "../constants/actionTypes";
import { resizeGrid } from "../utils/grid";

interface GridState {
  grid: string[];
  columns: number;
  rows: number;
}

interface GridAction {
  type: GridActionKind;
  payload?: any;
}

const gridReducer = (state: GridState, action: GridAction) => {
  const { type, payload } = action;
  switch (type) {
    case GridActionKind.UPDATE_GRID:
      return {
        ...state,
        grid: payload,
      };
    case GridActionKind.INCREASE_COLUMN:
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
    case GridActionKind.DECREASE_COLUMN:
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
    case GridActionKind.INCREASE_ROW:
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
    case GridActionKind.DECREASE_ROW:
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

export default gridReducer;
