import { useAppDispatch } from "../hooks/useRedux";
import { reset } from "../store";

const NewProject = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="rounded bg-gray-500 px-4 py-2 text-sm text-gray-100"
      onClick={() => {
        dispatch(reset());
      }}
    >
      NEW
    </button>
  );
};

export default NewProject;
