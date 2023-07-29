import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToolOption } from "../../types/Tool";
import { INITIAL_TOOL_OPTIONS } from "../../constants";
import {
  getBucketFillGridAndIndexes,
  getMoveIndexes,
  getTargetIndexes,
  isGridsEqual,
  resizeGrid,
} from "../../utils/grid";
import { initialProject } from "../../tests/fixtures/projectsStore";

import { setAuth } from "./authSlice";
import { projectsApi } from "../apis/projectsApi";
import { RootState } from "..";

import type { Project } from "../../types/Project";

export type Projects = {
  data: Project;
  currentFrameId: number;
  currentProjectId: number | string;
  selectedTool: keyof ToolOption;
  options: ToolOption;
};

type MoveOptions = {
  xDiff: number;
  yDiff: number;
  cellWidth: number;
};

const initialState: Projects = {
  data: initialProject.data,
  currentFrameId: 0,
  currentProjectId: 0,
  selectedTool: "pen",
  options: INITIAL_TOOL_OPTIONS,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    applyPencil(state, action: PayloadAction<number>) {
      const color = state.options.pen.color;
      const size = state.options.pen.size;
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );
      const newGrid = currentFrame?.grid.slice();
      const columns = project.gridColumns;
      const rows = project.gridRows;

      if (columns && rows) {
        const targetIndexes = getTargetIndexes(
          action.payload,
          size,
          columns,
          rows
        );

        if (newGrid && currentFrame) {
          targetIndexes.forEach((idx) => {
            newGrid[idx] = color;
          });

          if (!isGridsEqual(currentFrame.grid, newGrid)) {
            currentFrame.grid = newGrid;
          }
        }
      }
    },
    applyEraser(state, action: PayloadAction<number>) {
      const size = state.options.eraser.size;
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      const newGrid = currentFrame?.grid.slice();
      const columns = project.gridColumns;
      const rows = project.gridRows;

      if (columns && rows) {
        const targetIndexes = getTargetIndexes(
          action.payload,
          size,
          columns,
          rows
        );

        if (newGrid) {
          targetIndexes.forEach((idx) => {
            newGrid[idx] = "";
          });

          if (currentFrame) {
            if (!isGridsEqual(currentFrame.grid, newGrid)) {
              currentFrame.grid = newGrid;
            }
          }
        }
      }
    },
    applyBucket(state, action: PayloadAction<number>) {
      const penColor = state.options.pen.color;
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      const newGrid = currentFrame?.grid.slice();
      const columns = project.gridColumns;
      const rows = project.gridRows;

      if (currentFrame && newGrid && columns && rows) {
        const originColor = currentFrame.grid[action.payload];
        const { grid: targetGrid } = getBucketFillGridAndIndexes(
          newGrid,
          action.payload,
          originColor,
          penColor,
          columns,
          rows
        );

        if (
          targetGrid.length > 0 &&
          !isGridsEqual(currentFrame.grid, targetGrid)
        ) {
          currentFrame.grid = targetGrid;
        }
      }
    },
    applyMove(state, action: PayloadAction<MoveOptions>) {
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      const columns = project.gridColumns;
      const rows = project.gridRows;

      if (columns && rows && currentFrame) {
        let newGrid = currentFrame.grid;
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

        if (newGrid.length > 0 && !isGridsEqual(currentFrame?.grid, newGrid)) {
          currentFrame.grid = newGrid;
        }
      }
    },
    changeSelectedTool(state, action: PayloadAction<keyof ToolOption>) {
      state.selectedTool = action.payload;
    },
    changePenColor(state, action: PayloadAction<string>) {
      state.options.pen.color = action.payload;
    },
    changePenSize(state, action: PayloadAction<number>) {
      state.options.pen.size = action.payload;
    },
    changeEraserSize(state, action: PayloadAction<number>) {
      state.options.eraser.size = action.payload;
    },
    increseColumn(state) {
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      if (currentFrame) {
        const columns = project.gridColumns;
        const rows = project.gridRows;

        currentFrame.grid = resizeGrid(
          currentFrame?.grid,
          rows,
          columns,
          rows,
          columns + 1
        );
        project.gridColumns += 1;
      }
    },
    decreseColumn(state) {
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      if (currentFrame) {
        const columns = project.gridColumns;
        const rows = project.gridRows;

        currentFrame.grid = resizeGrid(
          currentFrame?.grid,
          rows,
          columns,
          rows,
          columns - 1
        );
        project.gridColumns -= 1;
      }
    },
    increseRow(state) {
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      if (currentFrame) {
        const columns = project.gridColumns;
        const rows = project.gridRows;

        currentFrame.grid = resizeGrid(
          currentFrame?.grid,
          rows,
          columns,
          rows + 1,
          columns
        );
        project.gridRows += 1;
      }
    },
    decreseRow(state) {
      const { data: project, currentFrameId } = state;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      if (currentFrame) {
        const columns = project.gridColumns;
        const rows = project.gridRows;

        currentFrame.grid = resizeGrid(
          currentFrame?.grid,
          rows,
          columns,
          rows - 1,
          columns
        );
        project.gridRows -= 1;
      }
    },
    changeProject(state, action: PayloadAction<Project>) {
      state.data = action.payload;
      state.currentProjectId = action.payload.id;
      state.currentFrameId = action.payload.frames[0].id;
    },
    reset() {
      return initialState;
    },
    resetFrame(state) {
      const { data: project, currentFrameId } = state;
      const { gridColumns, gridRows } = project;

      const currentFrame = project.frames.find(
        (frame) => frame.id === currentFrameId
      );

      if (currentFrame) {
        currentFrame.grid = Array.from(
          { length: gridColumns * gridRows },
          () => ""
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(setAuth, (state, { payload }) => {
      state.currentProjectId = payload.user.current;
    });
    builder.addMatcher(
      projectsApi.endpoints.fetchProject.matchFulfilled,
      (state, { payload }) => {
        const project = payload ?? initialProject.data;
        state.data = project;
        state.currentFrameId = project.frames[0].id;
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.updateProject.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );
  },
});

export const selectFrame = (state: RootState) => {
  const { data: project, currentFrameId } = state.projects;
  const frame = project.frames.find(({ id }) => id === currentFrameId);
  return frame || initialProject.data.frames[0];
};

export const {
  changeSelectedTool,
  changePenColor,
  changePenSize,
  changeEraserSize,
  applyPencil,
  applyEraser,
  applyBucket,
  applyMove,
  increseColumn,
  decreseColumn,
  increseRow,
  decreseRow,
  changeProject,
  reset,
  resetFrame,
} = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;
