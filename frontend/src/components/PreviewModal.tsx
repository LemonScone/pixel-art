import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { Modal } from "./common/Modal";
import { closeModal } from "../store";
import Preview from "./Preview";

const PreviewModal = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  return (
    <Modal.Frame
      open={!!params.get("modal")}
      onClose={() => {
        params.delete("modal");
        setParams(params);
        dispatch(closeModal());
      }}
      size="5xl"
    >
      <Modal.Head>Preview</Modal.Head>
      <Modal.Body>
        <Preview animate={true} cellSize={10} />
      </Modal.Body>
    </Modal.Frame>
  );
};

export default PreviewModal;
