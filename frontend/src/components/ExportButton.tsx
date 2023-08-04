import { useSearchParams } from "react-router-dom";
import ExportModal from "./ExportModal";
import { useState } from "react";

const ExportButton = () => {
  const [params, setParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-primary-color-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-primary-color-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color-600"
        onClick={() => {
          setParams({ ...params, modal: "true" });
          setOpenModal(true);
        }}
      >
        Export
      </button>
      <ExportModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default ExportButton;
