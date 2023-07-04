import UndoRedo from "./UndoRedo";
import Pencil from "./Pencil";
import Eraser from "./Eraser";
import Move from "./Move";
import Bucket from "./Bucket";

const ToolConatiner = () => {
  return (
    <div className="ml-2 flex flex-col items-center md:ml-4 md:items-start">
      <div className="mt-4 flex h-fit w-fit items-center justify-evenly gap-2 rounded bg-neutral-900 p-2 md:mt-0 md:w-10 md:flex-col md:p-6">
        <UndoRedo />
        <Bucket />
        <Pencil />
        <Eraser />
        <Move />
      </div>
    </div>
  );
};

export default ToolConatiner;
