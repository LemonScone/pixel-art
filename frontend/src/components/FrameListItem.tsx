import {
  ClockIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Frame } from "../types/Project";
import { generatePixelDrawCSS } from "../utils/cssParse";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  changeFrame,
  changeFrameInterval,
  copyFrame,
  removeFrame,
} from "../store";
import classNames from "../utils/classNames";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type FrameListItemProps = {
  frame: Frame;
  columns: number;
  rows: number;
  cellSize: number;
  canDelete: boolean;
};

const FrameListItem = ({
  frame,
  columns,
  rows,
  cellSize,
  canDelete,
}: FrameListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentFrameId } = useAppSelector((state) => state.projects.present);
  const dispatch = useAppDispatch();
  const [animateInterval, setAnimateInterval] = useState(frame.animateInterval);

  const cssString = generatePixelDrawCSS(
    frame.grid,
    columns,
    cellSize,
    "string"
  );

  const activeClassname = "border-2 border-primary-color";
  const active = currentFrameId === frame.id;

  const cursorNotallowed = "cursor-not-allowed";
  const cursorPointer = "cursor-pointer";

  useEffect(() => {
    if (active) {
      if (ref.current) {
        ref.current.scrollIntoView();
      }
    }
  }, [active]);

  useEffect(() => {
    setAnimateInterval(frame.animateInterval);
  }, [frame.animateInterval]);

  const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (active) {
      const { value } = e.target;

      setAnimateInterval(Number(value));
      dispatch(changeFrameInterval(Number(value)));
    }
  };

  return (
    <div
      className={classNames(
        active ? activeClassname : "",
        "flex h-[100px] w-[100px] flex-col rounded bg-gray-400"
      )}
      onClick={() => dispatch(changeFrame(frame.id))}
      ref={ref}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          style={{
            width: columns * cellSize,
            height: rows * cellSize,
            position: "relative",
          }}
        >
          <div
            style={{
              height: cellSize,
              width: cellSize,
              boxShadow: cssString,
              MozBoxShadow: cssString,
              WebkitBoxShadow: cssString,
            }}
          ></div>
        </div>
        <div className="absolute right-2 top-2">
          <div className="flex flex-col gap-2 rounded bg-neutral-900 p-2">
            <button
              className={classNames(
                canDelete ? cursorPointer : cursorNotallowed,
                "flex items-center justify-center text-input-color hover:text-primary-color"
              )}
              title="delete"
              disabled={!canDelete}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFrame(frame.id));
              }}
            >
              <TrashIcon
                width="1em"
                height="1em"
                className="text-gray-100 hover:text-primary-color"
              />
            </button>
            <button
              className="flex cursor-pointer items-center justify-center text-input-color hover:text-primary-color"
              title="copy"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(copyFrame(frame.id));
              }}
            >
              <DocumentDuplicateIcon
                width="1em"
                height="1em"
                className="text-gray-100 hover:text-primary-color"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="relative p-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <ClockIcon className="h-3 w-3 text-gray-400" />
        </div>
        <input
          type="number"
          id={"interval" + frame.id}
          className="block w-full rounded-lg border border-gray-600 bg-input-color p-0.5 pl-3 text-center text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          value={animateInterval}
          onChange={handleIntervalChange}
          disabled={!active}
        />
      </div>
    </div>
  );
};

export default FrameListItem;
