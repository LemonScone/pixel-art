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
          className="w-full rounded border border-gray-800 bg-gray-200 p-1 text-left text-sm text-gray-900 focus:border-gray-600 focus:outline-none"
        ></input>
      </div>
    </>
  );
};

export default Title;
