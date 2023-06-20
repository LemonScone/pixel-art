import React from "react";
import UndoRedo from "./UndoRedo";
import Pencil from "./Pencil";
import EyeDropper from "./EyeDropper";
import Eraser from "./Eraser";
import Move from "./Move";
import Bucket from "./Bucket";
import { ToolOption } from "../types/Tool";

type ToolContainerProps = {
  selectedTool: keyof ToolOption;
  toolOptions: ToolOption;
  onChangeToolSize: ({
    tool,
    size,
  }: {
    tool: keyof ToolOption;
    size: number;
  }) => void;
  onChangeTool: ({ tool }: { tool: keyof ToolOption }) => void;
};

const ToolConatiner = ({
  selectedTool,
  toolOptions,
  onChangeToolSize,
  onChangeTool,
}: ToolContainerProps) => {
  return (
    <div className="ml-2 flex flex-col items-center md:ml-4 md:items-start">
      <div className="mt-4 flex h-fit w-fit items-center justify-evenly gap-2 rounded bg-neutral-900 p-2 md:mt-0 md:w-10 md:flex-col md:p-6">
        <UndoRedo />
        <Bucket />
        <Pencil
          selected={selectedTool === "pen"}
          size={toolOptions.pen.size}
          onChangeTool={() => onChangeTool({ tool: "pen" })}
          onChangeToolSize={({ size }) =>
            onChangeToolSize({ tool: "pen", size })
          }
        />
        <Eraser
          selected={selectedTool === "eraser"}
          size={toolOptions.eraser.size}
          onChangeTool={() => onChangeTool({ tool: "eraser" })}
          onChangeToolSize={({ size }) =>
            onChangeToolSize({ tool: "eraser", size })
          }
        />
        <EyeDropper />
        <Move />
      </div>
    </div>
  );
};

export default ToolConatiner;
