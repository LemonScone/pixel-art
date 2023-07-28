import { useSearchParams } from "react-router-dom";
import { Modal } from "./common/Modal";
import { useLazyFetchProjectsQuery } from "../store";
import ProjectsListItem from "./ProjectsListItem";
import Skeleton from "./common/Skeleton";

const LoadProject = () => {
  const [params, setParams] = useSearchParams();

  const [getProjects, { data, error, isFetching }] =
    useLazyFetchProjectsQuery();

  let content;

  if (isFetching) {
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
        className="grow rounded bg-gray-500 px-4 py-2 text-sm text-gray-100"
        onClick={() => {
          getProjects();
          setParams({ ...params, modal: "true" });
        }}
      >
        LOAD
      </button>
      <Modal.Frame
        open={!!params.get("modal")}
        onClose={() => {
          params.delete("modal");
          setParams(params);
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
    </>
  );
};

export default LoadProject;
