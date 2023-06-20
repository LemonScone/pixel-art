import {
  ArrowsPointingInIcon,
  PlayIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const PreviewHandler = () => {
  return (
    <div className="mb-4 mt-2 flex w-fit rounded bg-neutral-900">
      <div className="flex items-center justify-center p-2">
        <button
          type="button"
          className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="sr-only">Pencil</span>
          <PlayIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="sr-only">Pencil</span>
          <ArrowsPointingInIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="rounded-lg bg-neutral-900 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="sr-only">Pencil</span>
          <WindowIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default PreviewHandler;
