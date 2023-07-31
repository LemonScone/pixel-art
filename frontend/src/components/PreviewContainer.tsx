import { ClockIcon } from "@heroicons/react/24/outline";
import Preview from "./Preview";
import PreviewHandler from "./PreviewHandler";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useRedux";
import { useDispatch } from "react-redux";
import { changeDuration } from "../store";

const CELL_SIZE_SM = 3;
const CELL_SIZE_LG = 6;

const PreviewContainer = () => {
  const dispatch = useDispatch();
  const storedDuration = useAppSelector((state) => state.projects.duration);

  const [large, setLarge] = useState(false);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(storedDuration);

  const cellSize = large ? CELL_SIZE_LG : CELL_SIZE_SM;

  const handleToggleSize = () => {
    setLarge((prevLarge) => !prevLarge);
  };

  const handleTogglePlay = () => {
    setPlay((prevPlay) => !prevPlay);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 2) {
      dispatch(changeDuration(parseInt(e.target.value, 10) || 1));
    }
  };

  useEffect(() => {
    setDuration(storedDuration);
  }, [storedDuration]);

  return (
    <>
      <PreviewHandler
        play={play}
        large={large}
        onToggleSize={handleToggleSize}
        onTogglePlay={handleTogglePlay}
      />
      <div className="col-span-5"></div>
      <div className="bg-neutral-900 p-4">
        <div className="flex h-full grow flex-col justify-between gap-1">
          <Preview animate={play} cellSize={cellSize} />
          <div className="relative py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <ClockIcon className="h-3 w-3 text-gray-400" />
            </div>
            <input
              type="number"
              id="duration"
              value={duration}
              className="block w-full rounded-lg border border-gray-600 bg-input-color p-0.5 pl-3 text-center text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              onChange={handleDurationChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewContainer;
