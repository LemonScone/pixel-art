import { PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import FrameListItem from "./FrameListItem";
import { newFrame } from "../store";
import getFrameInterval from "../utils/getFrameInterval";

const FrameList = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.projects);

  const columns = data.gridColumns;
  const rows = data.gridRows;

  const frames = data.frames.map((frame, idx, totalFrames) => ({
    ...frame,
    animateInterval: getFrameInterval({
      currentIndex: idx,
      totalFrames: totalFrames.length,
    }),
  }));

  return (
    <div className="flex gap-2 p-4">
      {frames.map((frame) => (
        <FrameListItem
          frame={frame}
          columns={columns}
          rows={rows}
          cellSize={2}
          key={frame.id}
          canDelete={frames.length > 1}
        />
      ))}
      <div className="flex w-4">
        <button
          className="h-full w-full rounded bg-input-color hover:bg-input-color-hover"
          onClick={() => dispatch(newFrame())}
          title="new"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default FrameList;
