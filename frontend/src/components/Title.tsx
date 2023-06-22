import React from "react";

const Title = () => {
  return (
    <>
      <label htmlFor="title" className="w-1/3 text-lg text-gray-100">
        Title
      </label>
      <div className="flex w-2/3">
        <input
          id="title"
          type="text"
          defaultValue="Pubao"
          className="w-full rounded bg-input-color p-1 text-left text-sm text-gray-100  focus:ring-2 focus:ring-white"
        ></input>
      </div>
    </>
  );
};

export default Title;
