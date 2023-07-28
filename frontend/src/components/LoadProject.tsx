import { Modal } from "./common/Modal";

import { useAppSelector } from "../hooks/useRedux";
import { useModal } from "../hooks/useModal";

import ProjectsListItem from "./ProjectsListItem";

const LoadProject = () => {
  const { data } = useAppSelector((state) => state.projects);
  const { open, openModal, closeModal } = useModal();

  let content;

  if (data.length) {
    content = data.map((project) => {
      return <ProjectsListItem key={project.id} project={project} />;
    });
  } else {
    content = <div>No projects found.</div>;
  }

  return (
    <>
      <button
        className="grow rounded bg-gray-500 px-4 py-2 text-sm text-gray-100"
        onClick={openModal}
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
