import { useSearchParams } from "react-router-dom";
import LoadProjectsModal from "./LoadProjectsModal";
import { useState } from "react";

const LoadProject = () => {
  const [params, setParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="grow rounded bg-input-color px-2 py-1 text-sm text-gray-100 hover:bg-input-color-hover"
        onClick={() => {
          setParams({ ...params, modal: "true" });
          setOpenModal(true);
        }}
      >
        LOAD
      </button>
      <LoadProjectsModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default LoadProject;
