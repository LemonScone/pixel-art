import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PauseIcon,
  PlayIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { openModal } from "../store";

type PreviewHandlerProps = {
  play: boolean;
  large: boolean;
  onToggleSize: () => void;
  onTogglePlay: () => void;
};

const PreviewHandler = ({
  play,
  large,
  onToggleSize,
  onTogglePlay,
}: PreviewHandlerProps) => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();

  return (
    <div className="col-span-2 mb-4 mt-2 flex w-fit rounded bg-neutral-900">
      <div className="flex items-center justify-center p-2">
        <button
          type="button"
          className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={onTogglePlay}
        >
          <span className="sr-only">Play</span>
          {play ? (
            <PauseIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <PlayIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={onToggleSize}
        >
          <span className="sr-only">Size</span>
          {large ? (
            <ArrowsPointingInIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <ArrowsPointingOutIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          onClick={() => {
            setParams({ ...params, modal: "true" });
            dispatch(openModal("Preview"));
          }}
        >
          <span className="sr-only">New window</span>
          <WindowIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default PreviewHandler;
