import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { toast, useUpdateProjectStatusMutation } from "../store";

const PublishToggleSwitch = () => {
  const dispatch = useAppDispatch();
  const [updateStatus] = useUpdateProjectStatusMutation();
  const loggedIn = useAppSelector((state) => state.auth.data.accessToken);
  const project = useAppSelector((state) => state.projects.present.data);
  const { isPublished } = project;

  return (
    <div className="flex items-center justify-between">
      <label htmlFor="publish" className="text-sm text-gray-100">
        Publish
      </label>
      <label
        htmlFor="publish"
        className="inline-flex cursor-pointer items-center rounded bg-input-color p-1 text-gray-100"
      >
        <input
          id="publish"
          type="checkbox"
          role="switch"
          className="peer hidden"
          checked={isPublished}
          onChange={() => {
            if (!loggedIn) {
              dispatch(
                toast({ type: "failure", message: "Login is required." })
              );
              return;
            }

            if (project.id === "initial") {
              dispatch(
                toast({
                  type: "failure",
                  message: "You need to save the project.",
                })
              );
              return;
            }
            updateStatus(project);
          }}
        />
        <span
          aria-hidden="true"
          className="rounded bg-neutral-900 px-4 py-2 text-xs peer-checked:bg-input-color"
        >
          OFF
        </span>
        <span
          aria-hidden="true"
          className="rounded bg-input-color px-4 py-2 text-xs peer-checked:bg-primary-color peer-checked:text-black"
        >
          ON
        </span>
      </label>
    </div>
  );
};

export default PublishToggleSwitch;
