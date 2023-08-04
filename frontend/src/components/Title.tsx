import { ChangeEvent, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { useAppSelector } from "../hooks/useRedux";
import { useUpdateProjectMutation } from "../store";

import SpinIcon from "./common/icon/SpinIcon";

const Title = () => {
  const { data: project } = useAppSelector((state) => state.projects.present);

  const { title: storedTitle } = project;
  const [title, setTitle] = useState("");
  const [updateProject, results] = useUpdateProjectMutation();

  useEffect(() => {
    setTitle(storedTitle || "");
  }, [storedTitle]);

  const autoSave = () => {
    if (storedTitle !== title) {
      if (project.id !== "initial") {
        updateProject({ ...project, title });
      }
    }
  };

  useInterval(autoSave, 2 * 1000, [title, storedTitle]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex">
          <label htmlFor="title" className="w-1/3 text-sm text-gray-100">
            Title
          </label>
          <div className="flex w-2/3 flex-col">
            <input
              id="title"
              type="text"
              className="w-full rounded bg-input-color p-1 text-left text-sm text-gray-100  focus:ring-2 focus:ring-white"
              value={title}
              onChange={handleChange}
            ></input>
            {results.isLoading && (
              <div className="mt-1 flex items-center gap-1 text-primary-color">
                <SpinIcon className={"text-primary-color"} /> Update title...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
