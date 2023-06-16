import { EyeDropperIcon, PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import UndoRedo from "./UndoRedo";
import Pencil from "./Pencil";
import EyeDropper from "./EyeDropper";
import Eraser from "./Eraser";
import Move from "./Move";
import Bucket from "./Bucket";
import { ToolOption } from "../models";

const ToolConatiner = ({
  selectedTool,
  toolOptions,
  onChangeToolOptions,
}: {
  selectedTool: string;
  toolOptions: ToolOption;
  onChangeToolOptions: (toolOptions: ToolOption) => void
}) => {
  return (
    <div className="ml-2 flex flex-col items-center md:ml-4 md:items-start">
      <div className="mt-4 flex h-fit w-fit items-center justify-evenly gap-2 rounded bg-neutral-900 p-2 md:mt-0 md:w-10 md:flex-col md:p-6">
        <UndoRedo />
        <Bucket />
        <Pencil onChangeToolOptions={onChangeToolOptions} selectedTool={selectedTool} size={toolOptions.pen.size} />
        <Eraser />
        <EyeDropper />
        <Move />
      </div>
    </div>
  );
};

export default ToolConatiner;
