import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const UndoRedo = () => {
  return (
    <div className="flex content-center gap-2 border-r border-gray-100 pr-2 md:mb-2 md:flex-col md:border-b md:border-r-0 md:pb-4 md:pr-0">
      <button
        type="button"
        className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
      >
        <span className="sr-only">Pencil</span>
        <ArrowUturnLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
      >
        <span className="sr-only">Pencil</span>
        <ArrowUturnRightIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default UndoRedo;
