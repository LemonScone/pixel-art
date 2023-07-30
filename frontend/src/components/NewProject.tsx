import { useAppDispatch } from "../hooks/useRedux";
import { reset } from "../store";

const NewProject = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="rounded bg-input-color px-2 py-1 text-sm text-gray-100 hover:bg-input-color-hover"
      onClick={() => {
        dispatch(reset());
      }}
    >
      NEW
    </button>
  );
};

export default NewProject;
