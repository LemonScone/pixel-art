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
          className="w-full rounded  bg-input-color p-1 text-center text-sm text-gray-100 focus:ring-2 focus:ring-white"
        ></input>
      </div>
    </>
  );
};

export default PixelSize;
