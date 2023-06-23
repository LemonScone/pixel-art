import { useMemo, useReducer, useState } from "react";

import gridReducer from "../reducers/gridReducer";
import grid_sample from "../fixtures/grid";
import ToolConatiner from "../components/ToolContainer";
import PixelContainer from "../components/PixelContainer";
import PreviewHandler from "../components/PreviewHandler";
import NewProject from "../components/NewProject";
import LoadProject from "../components/LoadProject";
import SaveProject from "../components/SaveProject";
import ResetProject from "../components/ResetProject";
import NumberPicker from "../components/NumberPicker";
import PixelSize from "../components/PixelSize";
import Title from "../components/Title";
import ColorPallete from "../components/ColorPallete";
import PublishToggleSwitch from "../components/PublishToggleSwitch";

import {
  GRID_SIZE_MAX_VALUE,
  GRID_SIZE_MIN_VALUE,
  INITIAL_TOOL_OPTIONS,
} from "../constants";

import { GridSizeActionKind } from "../constants/actionTypes";

import { Tool, ToolOption } from "../types/Tool";

const Editor = () => {
  const [toolOptions, setToolOptions] = useState(INITIAL_TOOL_OPTIONS);
  const [selectedTool, setSelectedTool] = useState<Tool>("pen");
  const [pixelSize, setPixelSize] = useState(1);
  const [publish, setPublish] = useState(false);

  const [state, dispatch] = useReducer(gridReducer, {
    grid: JSON.parse(grid_sample),
    columns: 20,
    rows: 20,
  });

  const handleChangeToolSize = ({
    tool,
    size,
  }: {
    tool: keyof ToolOption;
    size: number;
  }) => {
    setToolOptions((prevOptions) => {
      return {
        ...prevOptions,
        [tool]: {
          ...prevOptions[tool],
          size,
        },
      };
    });
  };

  const memoizedGrid = useMemo(() => {
    return state.grid;
  }, [state.grid]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col justify-between md:flex-row">
      <div className="order-2 flex flex-grow flex-col justify-between md:order-1">
        <div className="flex flex-col items-center md:flex-row">
          <ToolConatiner
            selectedTool={selectedTool}
            toolOptions={toolOptions}
            onChangeToolSize={handleChangeToolSize}
            onChangeTool={({ tool }) => setSelectedTool(tool)}
          />
          <div className="flex flex-grow flex-col items-center p-10">
            <div className="h-fit w-72 touch-none select-none sm:w-80 md:w-96 lg:w-[32rem] xl:w-[50rem]">
              <PixelContainer
                columns={state.columns}
                rows={state.rows}
                grid={memoizedGrid}
                dispatch={dispatch}
                toolOptions={toolOptions}
                selectedTool={selectedTool}
              />
            </div>
          </div>
        </div>
        <div className="ml-4 mr-4 mt-4 flex flex-col pb-4">
          <PreviewHandler />
          <div className="flex divide-x divide-gray-700 rounded bg-neutral-900">
            <div className="p-4">
              <div className="h-24 w-36 bg-black text-white">preview</div>
            </div>
            <div className="flex-grow">
              <h1 className="text-white">Frames</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="order-1 mb-4 flex flex-col gap-6 divide-y divide-gray-700 rounded-b bg-neutral-900 md:order-2">
        <div className="flex flex-col gap-2 p-4">
          <NewProject />
          <div className="flex grow justify-center gap-2">
            <LoadProject />
            <SaveProject />
          </div>
          <ResetProject />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center">
            <NumberPicker
              name={"Width"}
              value={state.columns}
              minValue={GRID_SIZE_MIN_VALUE}
              maxValue={GRID_SIZE_MAX_VALUE}
              onIncrease={() =>
                dispatch({
                  type: GridSizeActionKind.INCREASE_COLUMN,
                })
              }
              onDecrease={() => {
                dispatch({
                  type: GridSizeActionKind.DECREASE_COLUMN,
                });
              }}
            />
          </div>
          <div className="flex items-center">
            <NumberPicker
              name={"Height"}
              value={state.rows}
              minValue={GRID_SIZE_MIN_VALUE}
              maxValue={GRID_SIZE_MAX_VALUE}
              onIncrease={() => {
                dispatch({
                  type: GridSizeActionKind.INCREASE_ROW,
                });
              }}
              onDecrease={() => {
                dispatch({
                  type: GridSizeActionKind.DECREASE_ROW,
                });
              }}
            />
          </div>
          <div className="flex items-center">
            <PixelSize value={pixelSize} onChangePixelSize={setPixelSize} />
          </div>
          <div className="flex items-center">
            <Title />
          </div>
        </div>
        <div className="flex justify-center p-4">
          <ColorPallete
            toolOptions={toolOptions}
            selectedTool={selectedTool}
            onChangeToolOptions={setToolOptions}
            onChangeSelectedTool={setSelectedTool}
          ></ColorPallete>
        </div>
        <div className="p-4">
          <PublishToggleSwitch
            checked={publish}
            onToggleSwitch={() => setPublish((prevPublish) => !prevPublish)}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
