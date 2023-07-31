import { openModal } from "../store";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";

const LoadProject = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        className="grow rounded bg-input-color px-2 py-1 text-sm text-gray-100 hover:bg-input-color-hover"
        onClick={() => {
          setParams({ ...params, modal: "true" });
          dispatch(openModal("LoadProjects"));
        }}
      >
        LOAD
      </button>
    </>
  );
};

export default LoadProject;
