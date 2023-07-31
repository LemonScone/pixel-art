import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { ActionCreators } from "redux-undo";
import classNames from "../utils/classNames";

const UndoRedo = () => {
  const dispatch = useAppDispatch();
  const past = useAppSelector((state) => state.projects.past);
  const future = useAppSelector((state) => state.projects.future);

  return (
    <div className="flex content-center gap-2 border-r border-gray-100 pr-2 md:mb-2 md:flex-col md:border-b md:border-r-0 md:pb-4 md:pr-0">
      <button
        type="button"
        className={classNames(
          past.length === 0 ? "" : "hover:text-primary-color",
          "rounded-lg bg-neutral-900 p-1 text-gray-100  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
        )}
        disabled={past.length === 0}
        onClick={() => dispatch(ActionCreators.undo())}
      >
        <span className="sr-only">undo</span>
        <ArrowUturnLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={classNames(
          future.length === 0 ? "" : "hover:text-primary-color",
          "rounded-lg bg-neutral-900 p-1 text-gray-100  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
        )}
        disabled={future.length === 0}
        onClick={() => dispatch(ActionCreators.redo())}
      >
        <span className="sr-only">redo</span>
        <ArrowUturnRightIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default UndoRedo;
