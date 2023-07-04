import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_TOOL_OPTIONS } from "../../constants";
import { ToolOption } from "../../types/Tool";

const initialState = {
  selectedTool: "pen" as keyof ToolOption,
  options: INITIAL_TOOL_OPTIONS as ToolOption,
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
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
  },
});

export const {
  changeSelectedTool,
  changePenColor,
  changePenSize,
  changeEraserSize,
} = toolsSlice.actions;
export const toolsReducer = toolsSlice.reducer;
