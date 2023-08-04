import { Project } from "../types/Project";
import { useModal } from "../hooks/useModal";
import { changeProject } from "../store";
import { useRemoveProjectMutation, useUpdateCurrentMutation } from "../store";
import { useAppDispatch } from "../hooks/useRedux";

import { TrashIcon } from "@heroicons/react/24/outline";
import Preview from "./Preview";

type ProjectsListItemProps = {
  project: Project;
};

const ProjectsListItem = ({ project }: ProjectsListItemProps) => {
  const dispatch = useAppDispatch();
  const { closeModal } = useModal();
  const [updateCurrent] = useUpdateCurrentMutation();
  const [removeProject] = useRemoveProjectMutation();

  const handleClick = () => {
    dispatch(changeProject(project));
    updateCurrent(project.id);
    closeModal();
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeProject(project);
  };

  return (
    <div
      className="shrink flex-grow-0 basis-auto transform cursor-pointer rounded-xl bg-neutral-900 p-4 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="relative">
        <div className="min-h-[5rem] rounded-xl bg-input-color">
          <Preview
            animate={project.frames.length > 1}
            cellSize={5}
            duration={1}
            project={project}
            activeFrameIndex={0}
          />
        </div>
        <div className="absolute right-3 top-3 ">
          <div className="rounded bg-neutral-900">
            <button
              className="flex items-center justify-center rounded-full p-2 hover:cursor-pointer"
              title="delete"
              onClick={handleDeleteClick}
            >
              <TrashIcon
                width="1em"
                height="1em"
                className="text-gray-100 hover:text-primary-color"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 flex items-center justify-between px-1 md:items-start">
        <div className="mb-2">
          <p className="text-navy-700 text-lg font-bold">
            {project.title ? project.title : "Untitled"}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsListItem;
