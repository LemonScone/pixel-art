import React from "react";

const PublishToggleSwitch = () => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="publish" className="text-lg text-gray-100">
        Publish
      </label>
      <label
        htmlFor="publish"
        className="inline-flex cursor-pointer items-center rounded bg-gray-300 p-1 text-gray-800"
      >
        <input id="publish" type="checkbox" className="peer hidden" />
        <span className="rounded bg-gray-500 px-4 py-2 text-sm peer-checked:bg-gray-300">
          OFF
        </span>
        <span className="rounded bg-gray-300 px-4 py-2 text-sm peer-checked:bg-primary-color">
          ON
        </span>
      </label>
    </div>
  );
};

export default PublishToggleSwitch;
