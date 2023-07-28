import { Project } from "../types/Project";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  generatePixelDrawCSS,
  generateAnimationCSSData,
} from "../utils/cssParse";
import Animation from "./Animation";

import { useModal } from "../hooks/useModal";
import { useRemoveProjectMutation, useUpdateCurrentMutation } from "../store";

type ProjectsListItemProps = {
  project: Project;
};

const ProjectsListItem = ({ project }: ProjectsListItemProps) => {
  const { closeModal } = useModal();
  const [updateCurrent] = useUpdateCurrentMutation();
  const [removeProject] = useRemoveProjectMutation();

  const {
    title,
    description,
    cellSize,
    gridColumns,
    gridRows,
    animate,
    frames,
  } = project;

  const animation = frames.length > 1 && animate;

  let cssString;
  let animationData;

  if (animation) {
    animationData = generateAnimationCSSData(
      frames.map((frame) => ({ ...frame, interval: frame.animateInterval })),
      gridColumns,
      cellSize
    );
  } else {
    const grid = frames[0].grid;
    cssString = generatePixelDrawCSS(grid, gridColumns, cellSize, "string");
  }

  const handleClick = () => {
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
        <div className="rounded-xl bg-input-color">
          <div
            style={{
              width: gridColumns * cellSize + cellSize * 2,
              height: gridRows * cellSize + cellSize * 2,
              position: "relative",
            }}
          >
            <div
              style={
                animation
                  ? undefined
                  : {
                      height: cellSize,
                      width: cellSize,
                      boxShadow: cssString,
                      MozBoxShadow: cssString,
                      WebkitBoxShadow: cssString,
                    }
              }
            >
              {animation ? (
                <Animation boxShadow={animationData} duration={10} />
              ) : null}
            </div>
          </div>
        </div>
        <button
          className="text-brand-500 absolute right-3 top-3 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer"
          title="delete"
          onClick={handleDeleteClick}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
            <TrashIcon width="1em" height="1em" className="text-rose-600" />
          </div>
        </button>
      </div>
      <div className="my-3 flex items-center justify-between px-1 md:items-start">
        <div className="mb-2">
          <p className="text-navy-700 text-lg font-bold">
            {title ? title : "Untitled"}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsListItem;
