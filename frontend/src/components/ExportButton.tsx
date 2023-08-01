import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { openModal } from "../store";

const ExportButton = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-primary-color-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-primary-color-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color-600"
      onClick={() => {
        setParams({ ...params, modal: "true" });
        dispatch(openModal("Export"));
      }}
    >
      Export
    </button>
  );
};

export default ExportButton;
