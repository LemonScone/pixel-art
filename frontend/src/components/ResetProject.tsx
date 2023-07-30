import { useAppDispatch } from "../hooks/useRedux";
import { resetFrame } from "../store";

const ResetProject = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="rounded bg-input-color px-2 py-1 text-sm text-gray-100 hover:bg-input-color-hover"
      onClick={() => dispatch(resetFrame())}
    >
      RESET
    </button>
  );
};

export default ResetProject;
