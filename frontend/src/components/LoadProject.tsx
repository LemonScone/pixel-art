import { Modal } from "./common/Modal";

import { useModal } from "../hooks/useModal";

import ProjectsListItem from "./ProjectsListItem";
import { useLazyFetchProjectsQuery } from "../store";
import Skeleton from "./common/Skeleton";

const LoadProject = () => {
  const [getProjects, { data, error, isLoading }] = useLazyFetchProjectsQuery();
  const { open, openModal, closeModal } = useModal();

  let content;

  if (isLoading) {
    content = <Skeleton className="h-48 w-48" times={3} />;
  } else if (error) {
    content = <div>Error loading projects</div>;
  } else if (data) {
    if (data.length) {
      content = data.map((project) => {
        return <ProjectsListItem key={project.id} project={project} />;
      });
    } else {
      content = <div>No projects found.</div>;
    }
  }

  return (
    <>
      <button
        className="grow rounded bg-input-color px-2 py-1 text-sm text-gray-100 hover:bg-input-color-hover"
        onClick={() => {
          getProjects();
          openModal();
        }}
      >
        LOAD
      </button>
      <Modal.Frame open={open()} onClose={closeModal} size="6xl">
        <Modal.Head>Load Projects</Modal.Head>
        <Modal.Body>
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {content}
          </div>
        </Modal.Body>
      </Modal.Frame>
    </>
  );
};

export default LoadProject;
