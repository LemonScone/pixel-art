import React from "react";
import classNames from "../../utils/classNames";

const Toggle = ({
  id,
  label,
  disabled,
  className = "",
  onChange,
}: ToggleProps) => {
  return (
    <div className={classNames(className, "flex items-center")}>
      <label htmlFor={id} className="mr-1 text-sm text-gray-100">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        className={classNames(
          disabled
            ? "cursor-not-allowed bg-neutral-500 before:bg-primary-color-700"
            : "cursor-pointer bg-neutral-900 before:bg-primary-color-600",
          "h-5 w-9 appearance-none rounded-full  shadow-inner transition-all duration-300 before:ml-0.5 before:inline-block before:h-4 before:w-4 before:rounded-full   checked:before:translate-x-full focus:outline-none"
        )}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

type ToggleProps = {
  id: string;
  label: string;
  disabled: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default Toggle;
