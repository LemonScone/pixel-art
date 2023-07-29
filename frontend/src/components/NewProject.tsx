import { useAppDispatch } from "../hooks/useRedux";
import { reset } from "../store";

const NewProject = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="rounded bg-input-color px-4 py-2 text-sm text-gray-100 hover:bg-input-color-hover"
      onClick={() => {
        dispatch(reset());
      }}
    >
      NEW
    </button>
  );
};

export default NewProject;
