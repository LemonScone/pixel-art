import { PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

import { newFrame, reorderFrame } from "../store";

import FrameListItem from "./FrameListItem";

import getFrameInterval from "../utils/getFrameInterval";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      reorderFrame({ sourceIndex: source.index, destIndex: destination.index })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="drop-list" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-2 p-4"
          >
            {frames.map((frame, index) => (
              <Draggable
                draggableId={frame.id.toString()}
                key={frame.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <FrameListItem
                      frame={frame}
                      columns={columns}
                      rows={rows}
                      cellSize={2}
                      canDelete={frames.length > 1}
                    />
                  </div>
                )}
              </Draggable>
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FrameList;
