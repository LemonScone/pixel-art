import { EyeDropperIcon } from "@heroicons/react/24/outline";
import React from "react";

const EyeDropper = () => {
  return (
    <button
      type="button"
      className="rounded-lg p-1 text-gray-400  hover:bg-primary-color hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
    >
      <span className="sr-only">Eye Dropper</span>
      <EyeDropperIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default EyeDropper;
