import { createSlice } from "@reduxjs/toolkit";

type Frame = {
  id: number;
  projectId: number;
  grid: string;
  animateInterval: number;
};

type Project = {
  id: number;
  animate: boolean;
  cellSize: number;
  gridColumns: number;
  gridRows: number;
  pallete: string;
  title: string;
  description: string;
  isPublished: boolean;

  frames: Frame[];
};

type Projects = {
  data: Project[];
};

const initialState: Projects = {
  data: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export const projectsReducer = projectsSlice.reducer;
