import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { ToolOption } from "../models";

const PencilSizes = [1, 2, 3, 4, 5];

const Pencil = ({
  selectedTool,
  size,
  onChangeToolOptions,
}: {
  selectedTool: string;
  size: number;
  onChangeToolOptions: (options: ToolOption) => void;
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const popOverVariants = {
    hidden: "hidden",
    show: "",
  };

  const selectedClass = "bg-gray-200";

  return (
    <>
      <a
        type="button"
        role="button"
        className="relative cursor-pointer rounded-lg bg-primary-color-600 p-1 text-gray-900 hover:bg-primary-color hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
        onClick={() => setShowPopover((prevShow) => !prevShow)}
      >
        <span className="sr-only">Pencil</span>
        <PencilIcon className="h-6 w-6" aria-hidden="true" />
        <div
          role="tooltip"
          className={`${
            popOverVariants[showPopover ? "show" : "hidden"]
          } absolute left-0 z-20 -mt-14 ml-8 w-fit rounded bg-white p-4 shadow-lg transition duration-150 ease-in-out`}
        >
          <svg
            className="bott om-0  absolute left-0 top-0 -ml-2 h-full"
            width="9px"
            height="16px"
            viewBox="0 0 9 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Tooltips-"
                transform="translate(-874.000000, -1029.000000)"
                fill="#FFFFFF"
              >
                <g
                  id="Group-3-Copy-16"
                  transform="translate(850.000000, 975.000000)"
                >
                  <g id="Group-2" transform="translate(24.000000, 0.000000)">
                    <polygon
                      id="Triangle"
                      transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                      points="4.5 57.5 12.5 66.5 -3.5 66.5"
                    ></polygon>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div className="flex justify-evenly text-sm font-bold text-gray-800">
            {PencilSizes.map((pencilSize) => {
              return (
                <div
                  key={pencilSize}
                  className={`${
                    pencilSize === size ? selectedClass : ""
                  } flex flex-col items-center px-4 py-2`}
                >
                  ⬛ <span>{pencilSize}</span>
                </div>
              );
            })}
          </div>
        </div>
      </a>
    </>
  );
};

export default Pencil;
