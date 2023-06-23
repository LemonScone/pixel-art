import React from "react";

type PublishToggleSwitchProps = {
  checked: boolean;
  onToggleSwitch: () => void;
};

const PublishToggleSwitch = ({
  checked,
  onToggleSwitch,
}: PublishToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="publish" className="text-lg text-gray-100">
        Publish
      </label>
      <label
        htmlFor="publish"
        className="inline-flex cursor-pointer items-center rounded bg-input-color p-1 text-gray-100"
      >
        <input
          id="publish"
          type="checkbox"
          role="switch"
          className="peer hidden"
          onChange={onToggleSwitch}
          checked={checked}
        />
        <span
          aria-hidden="true"
          className="rounded bg-neutral-900 px-4 py-2 text-sm peer-checked:bg-input-color"
        >
          OFF
        </span>
        <span
          aria-hidden="true"
          className="rounded bg-input-color px-4 py-2 text-sm peer-checked:bg-primary-color peer-checked:text-black"
        >
          ON
        </span>
      </label>
    </div>
  );
};

export default PublishToggleSwitch;
