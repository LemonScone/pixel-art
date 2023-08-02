import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { Modal } from "./common/Modal";
import { closeModal } from "../store";
import { Tab } from "./common/Tab";

import Preview from "./Preview";

const PreviewModal = () => {
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();

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
        <Tab.Frame>
          <Tab.TabPane display="Static">
            <Preview animate={false} cellSize={10} />
          </Tab.TabPane>
          <Tab.TabPane display="Animation">
            <Preview animate={true} cellSize={10} />
          </Tab.TabPane>
        </Tab.Frame>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default PreviewModal;
