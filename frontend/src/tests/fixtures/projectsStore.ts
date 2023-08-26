import { INITIAL_COLOR_PALLETE, INITIAL_TOOL_OPTIONS } from "../../constants";

import { Project } from "../../types/Project";
import { ToolOption } from "../../types/Tool";

import { randomStr } from "../../utils/random";
import grid from "./grid";

const initialGrid = JSON.parse(grid);
const frame = {
  id: 0,
  projectId: 0,
  grid: initialGrid,
  animateInterval: 25,
};

const projectsStore: ProjectStore = {
  data: {
    id: 0,
    animate: false,
    cellSize: 10,
    gridColumns: 20,
    gridRows: 20,
    pallete: INITIAL_COLOR_PALLETE,
    title: "title",
    description: "description",
    isPublished: false,

    frames: [frame],
    frameIds: [frame.id],
    indexedFrames: {
      [frame.id]: frame,
    },
  },
  currentProjectId: 0,
  currentFrameId: 0,
  selectedTool: "pen",
  options: INITIAL_TOOL_OPTIONS,
  duration: 1,
};

const exampleState = (
  grid: string[],
  gridColumns: number,
  gridRows: number
) => {
  return {
    data: {
      id: 0,
      animate: false,
      cellSize: 10,
      gridColumns,
      gridRows,
      pallete: INITIAL_COLOR_PALLETE,
      title: "title",
      description: "description",
      isPublished: false,

      frames: [
        {
          id: 0,
          projectId: 0,
          grid,
          animateInterval: 25,
        },
      ],
      frameIds: [0],
      indexedFrames: {
        0: {
          id: 0,
          projectId: "initial",
          grid: Array.from({ length: 16 * 16 }, () => ""),
          animateInterval: 25,
        },
      },
    },
    currentProjectId: 0,
    currentFrameId: 0,
    selectedTool: "pen" as keyof ToolOption,
    options: INITIAL_TOOL_OPTIONS,
    duration: 1,
  } as ProjectStore;
};

const initialProject = {
  present: {
    data: {
      id: "initial",
      animate: false,
      cellSize: 10,
      gridColumns: 16,
      gridRows: 16,
      pallete: INITIAL_COLOR_PALLETE,
      title: "",
      description: "",
      isPublished: false,
      frames: [
        {
          id: 0,
          projectId: "initial",
          grid: Array.from({ length: 16 * 16 }, () => ""),
          animateInterval: 25,
        },
      ],
      frameIds: [0],
      indexedFrames: {
        0: {
          id: 0,
          projectId: "initial",
          grid: Array.from({ length: 16 * 16 }, () => ""),
          animateInterval: 25,
        },
      },
    },
    currentProjectId: "initial",
    currentFrameId: 0,
    selectedTool: "pen" as keyof ToolOption,
    options: INITIAL_TOOL_OPTIONS,
    duration: 1,
  },
  past: [],
  future: [],
};

const getNewProject = () => {
  const id = randomStr();

  return {
    data: {
      id,
      animate: false,
      cellSize: 10,
      gridColumns: 16,
      gridRows: 16,
      pallete: INITIAL_COLOR_PALLETE,
      title: "",
      description: "",
      isPublished: false,
      frames: [
        {
          id: 0,
          projectId: id,
          grid: Array.from({ length: 16 * 16 }, () => ""),
          animateInterval: 25,
        },
      ],
    },
    currentProjectId: "initial",
    currentFrameId: 0,
    selectedTool: "pen" as keyof ToolOption,
    options: INITIAL_TOOL_OPTIONS,
    duration: 1,
  };
};

type ProjectStore = {
  data: Project;
  currentProjectId: string | number;
  currentFrameId: string | number;
  selectedTool: keyof ToolOption;
  options: ToolOption;
  duration: number;
};

export { exampleState, initialProject, getNewProject };
export default projectsStore;
