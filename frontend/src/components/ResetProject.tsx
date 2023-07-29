import { useAppDispatch } from "../hooks/useRedux";
import { resetFrame } from "../store";

const ResetProject = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="rounded bg-gray-500 px-4 py-2 text-sm text-gray-100"
      onClick={() => dispatch(resetFrame())}
    >
      RESET
    </button>
  );
};

export default ResetProject;
