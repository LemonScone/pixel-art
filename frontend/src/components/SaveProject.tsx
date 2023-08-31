import { useAddProjectMutation } from "../store";
import { Project } from "../types/Project";
import Button from "./common/Button";
import { framesToArray } from "../utils/frames";

const SaveProject = ({ project }: { project: Project }) => {
  const [addProject, results] = useAddProjectMutation();

  const handleSaveProject = () => {
    const newProject = {
      ...project,
      frames: framesToArray(project.frameIds, project.indexedFrames),
    };
    addProject(newProject);
  };
  return (
    <Button
      className="flex grow justify-center rounded bg-input-color px-2 py-1 text-center text-sm text-gray-100 hover:bg-input-color-hover"
      onClick={handleSaveProject}
      loading={results.isLoading}
    >
      SAVE
    </Button>
  );
};

export default SaveProject;
