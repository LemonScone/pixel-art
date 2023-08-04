import { useSearchParams } from "react-router-dom";
import { Modal } from "./common/Modal";
import { useLazyFetchProjectsQuery } from "../store";
import Skeleton from "./common/Skeleton";
import ProjectsListItem from "./ProjectsListItem";
import { useEffect } from "react";

const LoadProjectsModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [params, setParams] = useSearchParams();
  const [fetchProjects, { data, error, isLoading }] =
    useLazyFetchProjectsQuery();

  useEffect(() => {
    if (open) {
      fetchProjects();
    }
  }, [open, fetchProjects]);

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
    <Modal.Frame
      open={open}
      onClose={() => {
        params.delete("modal");
        setParams(params);
        onClose();
      }}
      size="6xl"
    >
      <Modal.Head>Load Projects</Modal.Head>
      <Modal.Body>
        <div className="flex flex-wrap items-stretch justify-center gap-8">
          {content}
        </div>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default LoadProjectsModal;
