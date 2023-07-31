import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { Modal } from "./common/Modal";
import { closeModal, useFetchProjectsQuery } from "../store";
import Skeleton from "./common/Skeleton";
import ProjectsListItem from "./ProjectsListItem";

const LoadProjectsModal = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useFetchProjectsQuery();

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
      open={!!params.get("modal")}
      onClose={() => {
        params.delete("modal");
        setParams(params);
        dispatch(closeModal());
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
