import React, { useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const EraserSizes = [1, 2, 3, 4, 5];

type EraserProps = {
  selected: boolean;
  size: number;
  onChangeTool: () => void;
  onChangeToolSize: ({ size }: { size: number }) => void;
};

const Eraser = ({
  selected,
  size,
  onChangeTool,
  onChangeToolSize,
}: EraserProps) => {
  const [showToolbar, setShowToolbar] = useState(false);


  const handleClickOutside = () => setShowToolbar(false);
  const ref = useOutsideClick(handleClickOutside);

  const toolbarVariants = {
    hidden: "hidden",
    show: "",
  };

  const selectedClass = "bg-gray-200";

  type TextSizeVariantsType = {
    [key: number]: string;
  };
  const textSizeVariants: TextSizeVariantsType = {
    1: "w-2",
    2: "w-3",
    3: "w-4",
    4: "w-5",
    5: "w-6",
  };

  return (
    <>
      <a
        type="button"
        role="button"
        ref={ref}
        className={
          selected
            ? "relative cursor-pointer rounded-lg bg-primary-color-600 p-1 text-gray-900 hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
            : "relative cursor-pointer rounded-lg p-1 text-gray-400 hover:bg-primary-color-600 hover:text-gray-900  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color"
        }
        onClick={() => {
          setShowToolbar((prevShow) => !prevShow);
          onChangeTool();
        }}
      >
        <span className="sr-only">Eraser</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
          <path d="M22 21H7" />
          <path d="m5 11 9 9" />
        </svg>
        <div
          role="toolbar"
          aria-label="select eraser size"
          aria-hidden={!showToolbar}
          className={`${
            toolbarVariants[showToolbar ? "show" : "hidden"]
          } absolute left-0 z-20 -ml-[9.6rem] mt-36 w-fit  rotate-90 rounded bg-white p-2 shadow-lg transition duration-150 ease-in-out md:-mt-12 md:ml-8 md:rotate-0`}
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
            {EraserSizes.map((eraserSize) => {
              return (
                <button
                  key={eraserSize}
                  className={`${
                    eraserSize === size ? selectedClass : ""
                  } flex items-center px-4  py-2 md:flex-col`}
                  onClick={() => onChangeToolSize({ size: eraserSize })}
                >
                  <div className="mr-2 flex h-6 items-center md:mr-0 md:items-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 94 94"
                      xmlSpace="preserve"
                      className={`${textSizeVariants[eraserSize]}`}
                    >
                      <g>
                        <path d="M94,88c0,3.312-2.688,6-6,6H6c-3.314,0-6-2.688-6-6V6c0-3.313,2.686-6,6-6h82c3.312,0,6,2.687,6,6V88z" />
                      </g>
                    </svg>
                  </div>
                  <div className="-rotate-90 md:rotate-0">{eraserSize}</div>
                </button>
              );
            })}
          </div>
        </div>
      </a>
    </>
  );
};

export default Eraser;
