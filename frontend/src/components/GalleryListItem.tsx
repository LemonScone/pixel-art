import Preview from "./Preview";

import { Artwork } from "../types/Project";

const GalleryListItem = ({
  project,
  onClick,
}: {
  project: Artwork;
  onClick: () => void;
}) => {
  const createdAt = project.createdAt.split("T")[0].replace(/-/g, ".");
  return (
    <>
      <div
        className="break-inside mb-4 flex cursor-pointer flex-col rounded-lg bg-input-color p-2"
        onClick={onClick}
      >
        <div className="flex w-full justify-center overflow-hidden">
          <Preview project={project} duration={1} animate={true} cellSize={3} />
        </div>
        <div className="mt-4 pl-2 text-gray-100">
          <h3 className="font-bold">{project.title || "Untitled"}</h3>
          <div className="my-1 flex-auto text-sm text-gray-400">
            <span className="mr-3">{project.username}</span>
            <span className="mr-3 max-h-0 border-r  border-gray-600"></span>
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryListItem;
