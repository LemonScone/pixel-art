import React from "react";

const PixelSize = () => {
  return (
    <>
      <label htmlFor="pixelSize" className="w-1/3 text-lg text-gray-100">
        Pixel size
      </label>
      <div className="flex w-2/3">
        <input
          id="pixelSize"
          type="text"
          defaultValue="1"
          className="w-full rounded border border-gray-800 bg-gray-200 p-1 text-center text-sm text-gray-900 focus:border-gray-600 focus:outline-none"
        ></input>
      </div>
    </>
  );
};

export default PixelSize;
