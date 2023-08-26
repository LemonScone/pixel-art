import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
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
import { randomStr } from "../../utils/random";

import getFrameInterval from "../../utils/getFrameInterval";
import {
  each,
  entries,
  findIndex,
  fromEntries,
  indexBy,
  map,
  pipe,
  reject,
  toArray,
} from "@fxts/core";

export type Projects = {
  data: Project;
  currentFrameId: number | string;
  currentProjectId: number | string;
  selectedTool: keyof ToolOption;
  options: ToolOption;
  duration: number;
};

type MoveOptions = {
  xDiff: number;
  yDiff: number;
  cellWidth: number;
};

const initialState: Projects = {
  data: initialProject.present.data,
  currentFrameId: 0,
  currentProjectId: 0,
  selectedTool: "pen",
  options: INITIAL_TOOL_OPTIONS,
  duration: 1,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    applyPencil(state, action: PayloadAction<number>) {
      const color = state.options.pen.color;
      const size = state.options.pen.size;
      const { data: project, currentFrameId } = state;

      const currentFrame = project.indexedFrames[currentFrameId];
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

      const currentFrame = project.indexedFrames[currentFrameId];

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

      const currentFrame = project.indexedFrames[currentFrameId];

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

      const currentFrame = project.indexedFrames[currentFrameId];

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
      const { data: project } = state;

      const columns = project.gridColumns;
      const rows = project.gridRows;

      pipe(
        project.indexedFrames,
        entries,
        each(
          ([_, frame]) =>
            (frame.grid = resizeGrid(
              frame.grid,
              rows,
              columns,
              rows,
              columns + 1
            ))
        )
      );

      project.gridColumns += 1;
    },
    decreseColumn(state) {
      const { data: project } = state;

      const columns = project.gridColumns;
      const rows = project.gridRows;

      pipe(
        project.indexedFrames,
        entries,
        each(
          ([_, frame]) =>
            (frame.grid = resizeGrid(
              frame.grid,
              rows,
              columns,
              rows,
              columns - 1
            ))
        )
      );

      project.gridColumns -= 1;
    },
    increseRow(state) {
      const { data: project } = state;

      const columns = project.gridColumns;
      const rows = project.gridRows;

      pipe(
        project.indexedFrames,
        entries,
        each(([_, frame]) =>
          resizeGrid(frame.grid, rows, columns, rows + 1, columns)
        )
      );

      project.gridRows += 1;
    },
    decreseRow(state) {
      const { data: project } = state;

      const columns = project.gridColumns;
      const rows = project.gridRows;

      pipe(
        project.indexedFrames,
        entries,
        each(([_, frame]) =>
          resizeGrid(frame.grid, rows, columns, rows - 1, columns)
        )
      );

      project.gridRows -= 1;
    },
    changeProject(state, action: PayloadAction<Project>) {
      state.data = action.payload;
      state.currentProjectId = action.payload.id;
      state.currentFrameId = action.payload.frameIds[0];
    },
    reset() {
      return initialState;
    },
    resetFrame(state) {
      const { data: project, currentFrameId } = state;
      const { gridColumns, gridRows } = project;

      const currentFrame = project.indexedFrames[currentFrameId];

      currentFrame.grid = Array.from(
        { length: gridColumns * gridRows },
        () => ""
      );
    },
    copyFrame(state, action: PayloadAction<number | string>) {
      const { data: project } = state;

      const currentIndex = project.frameIds.findIndex(
        (id) => id === action.payload
      );
      const currentFrame = project.indexedFrames[action.payload];

      if (currentFrame) {
        const id = randomStr();
        const newFrame = {
          ...currentFrame,
          id,
        };
        project.frameIds.splice(currentIndex + 1, 0, id);
        project.indexedFrames[id] = newFrame;
        state.currentFrameId = id;
      }
    },
    removeFrame(state, action: PayloadAction<number | string>) {
      const { data: project } = state;

      const removeIndex = project.frameIds.findIndex(
        (id) => id === action.payload
      );

      const nextActive =
        removeIndex > 0
          ? project.frameIds[removeIndex - 1]
          : project.frameIds[removeIndex + 1];

      state.data.frameIds = pipe(
        project.frameIds,
        reject((a) => a === action.payload),
        toArray
      );

      state.data.indexedFrames = pipe(
        project.indexedFrames,
        entries,
        reject(([_, { id }]) => id === action.payload),
        fromEntries
      );
      state.currentFrameId = nextActive;
    },
    changeFrame(state, action: PayloadAction<number | string>) {
      state.currentFrameId = action.payload;
    },
    changeFrameInterval(state, action: PayloadAction<number>) {
      const { currentFrameId } = state;
      const frame = state.data.indexedFrames[currentFrameId];
      frame.animateInterval = action.payload;
    },
    changeFramesInterval(state) {
      const { data: project } = state;

      const newFrames = pipe(
        project.frameIds,
        map((frameId) => {
          const idx = findIndex((id) => id === frameId, project.frameIds);
          return {
            ...project.indexedFrames[frameId],
            animateInterval: getFrameInterval({
              currentIndex: idx,
              totalFrames: project.frameIds.length,
            }),
          };
        }),
        indexBy((frame) => frame.id)
      );
      state.data.indexedFrames = newFrames;
    },
    newFrame(state) {
      const { currentProjectId: projectId, data } = state;
      const { gridColumns, gridRows } = data;

      const id = randomStr();
      const newFrame = {
        id,
        projectId,
        grid: Array.from({ length: gridColumns * gridRows }, () => ""),
        animateInterval: 10,
      };

      state.data.frameIds.push(id);
      state.data.indexedFrames[id] = newFrame;
      state.currentFrameId = id;
    },
    reorderFrame(
      state,
      action: PayloadAction<{ sourceIndex: number; destIndex: number }>
    ) {
      const { sourceIndex, destIndex } = action.payload;
      const targetFrameId = state.data.frameIds[sourceIndex];
      const frames = state.data.frameIds.map((id, idx) =>
        idx === sourceIndex ? "x" : id
      );

      frames.splice(
        destIndex > sourceIndex ? destIndex + 1 : destIndex,
        0,
        targetFrameId
      );

      state.data.frameIds = pipe(
        frames,
        reject((id) => id === "x"),
        toArray
      );
    },
    changeDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(setAuth, (state, { payload }) => {
      state.currentProjectId = payload.user.current;
    });
    builder.addMatcher(
      isAnyOf(copyFrame, removeFrame, newFrame, reorderFrame),
      (state) => {
        const { data: project } = state;

        const newFrames = pipe(
          project.frameIds,
          map((frameId) => {
            const idx = findIndex((id) => id === frameId, project.frameIds);
            return {
              ...project.indexedFrames[frameId],
              animateInterval: getFrameInterval({
                currentIndex: idx,
                totalFrames: project.frameIds.length,
              }),
            };
          }),
          indexBy((frame) => frame.id)
        );
        state.data.indexedFrames = newFrames;
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.fetchProject.matchFulfilled,
      (state, { payload }) => {
        const project = payload ?? initialProject.present.data;
        state.data = project;
        state.currentFrameId = project.frameIds[0];
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.updateProject.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.updateProjectStatus.matchFulfilled,
      (state) => {
        state.data.isPublished = !state.data.isPublished;
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.addProject.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
        state.currentProjectId = payload.id;
        state.currentFrameId = payload.frameIds[0];
      }
    );
    builder.addMatcher(
      projectsApi.endpoints.removeProject.matchFulfilled,
      (state, { payload }) => {
        if (state.data.id.toString() === payload.id.toString()) {
          state.data = initialProject.present.data;
          state.currentFrameId = initialProject.present.data.frameIds[0];
        }
      }
    );
  },
});

export const selectFrame = (state: RootState) => {
  const { data: project, currentFrameId } = state.projects.present;
  const frame = project.indexedFrames[currentFrameId];
  return frame || initialProject.present.data.indexedFrames[0];
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
  copyFrame,
  removeFrame,
  changeFrame,
  newFrame,
  reorderFrame,
  changeFrameInterval,
  changeFramesInterval,
  changeDuration,
} = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;
