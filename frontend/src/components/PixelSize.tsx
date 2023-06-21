import React from "react";

type PixelSizeProps = {
  value: number;
  onChangePixelSize: (size: number) => void;
};

const PixelSize = ({ value, onChangePixelSize }: PixelSizeProps) => {
  return (
    <>
      <label htmlFor="pixelSize" className="w-1/3 text-lg text-gray-100">
        Pixel size
      </label>
      <div className="flex w-2/3">
        <input
          id="pixelSize"
          type="number"
          value={value}
          onChange={(e) => {
            onChangePixelSize(parseInt(e.target.value) || 1);
          }}
          className="w-full rounded  bg-input-color p-1 text-center text-sm text-gray-100 focus:ring-2 focus:ring-white"
        ></input>
      </div>
    </>
  );
};

export default PixelSize;
