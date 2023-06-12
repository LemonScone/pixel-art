import "./App.css";

import { useState } from "react";

import PixelContainer from "./components/PixelContainer";

import grid_sample from "./fixtures/grid";
import { INITIAL_TOOL_OPTIONS } from "./constants";

import type { Tool } from "./models";

function App() {
  const [grid, setGrid] = useState(JSON.parse(grid_sample));
  const [toolOptions, setToolOptions] = useState(INITIAL_TOOL_OPTIONS);
  const [selectedTool, setSelectedTool] = useState<Tool>("pen");
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);

  return (
    <>
      <h1 className="text-5xl font-bold text-red-500 underline text-center">
        pixel-art!
      </h1>
      <div className="w-96 h-96 touch-none select-none">
        <PixelContainer
          columns={columns}
          rows={rows}
          grid={grid}
          onUpdateGrid={setGrid}
          toolOptions={toolOptions}
          selectedTool={selectedTool}
        />
      </div>
    </>
  );
}

export default App;
