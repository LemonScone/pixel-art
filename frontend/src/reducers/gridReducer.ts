import { GridSizeActionKind, UPDATE_GRID } from "../constants/actionTypes";
import { resizeGrid } from "../utils/grid";

interface GridState {
  grid: string[];
  columns: number;
  rows: number;
}

type GridAction = {
  type: typeof UPDATE_GRID;
  payload: string[];
};

type GridSizeAction = {
  type: GridSizeActionKind;
};

type Actions = GridAction | GridSizeAction;

const gridReducer = (state: GridState, action: Actions) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return {
        ...state,
        grid: action.payload,
      };
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

export default gridReducer;
