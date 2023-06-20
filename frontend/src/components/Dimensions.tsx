import React from "react";

const Dimensions = () => {
  return (
    <>
      <label htmlFor="width" className="w-1/3 text-lg text-gray-100">
        Size
      </label>
      <div className="flex w-2/3 justify-between gap-2">
        <div className="flex">
          <div className="flex w-8/12">
            <input
              id="width"
              type="text"
              defaultValue="7"
              className="w-full rounded-l-md border border-gray-800 bg-gray-200 text-center text-sm text-gray-900 focus:border-gray-600 focus:outline-none"
              disabled
            />
          </div>
          <div className="flex w-4/12 flex-col">
            <button className="text-md rounded-tr-md border border-gray-800 bg-gray-500 px-1 text-center font-semibold text-white focus:border-gray-600 focus:bg-gray-600 focus:outline-none">
              +
            </button>
            <button className="text-md rounded-br-md border border-gray-800 bg-gray-500 px-1 text-center font-semibold text-white focus:border-gray-600 focus:bg-gray-600 focus:outline-none">
              -
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-8/12">
            <input
              id="height"
              type="text"
              defaultValue="7"
              className="w-full rounded-l-md border border-gray-800 bg-gray-200 text-center text-sm text-gray-900 focus:border-gray-600 focus:outline-none"
              disabled
            />
          </div>
          <div className="flex w-4/12 flex-col">
            <button className="text-md rounded-tr-md border border-gray-800 bg-gray-500 px-1 text-center font-semibold text-white focus:border-gray-600 focus:bg-gray-600 focus:outline-none">
              +
            </button>
            <button className="text-md rounded-br-md border border-gray-800 bg-gray-500 px-1 text-center font-semibold text-white focus:border-gray-600 focus:bg-gray-600 focus:outline-none">
              -
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dimensions;
