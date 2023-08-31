import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

import { Modal } from "./common/Modal";
import { Tab } from "./common/Tab";
import Preview from "./Preview";

const PreviewModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const project = useAppSelector((state) => state.projects.present.data);
  const duration = useAppSelector((state) => state.projects.present.duration);
  const currentFrameId = useAppSelector(
    (state) => state.projects.present.currentFrameId
  );
  const [params, setParams] = useSearchParams();
  const activeFrameIndex = project.frameIds.findIndex(
    (id) => id === currentFrameId
  );

  return (
    <Modal.Frame
      open={open}
      onClose={() => {
        params.delete("modal");
        setParams(params);
        onClose();
      }}
      size="6xl"
    >
      <Modal.Head>Preview</Modal.Head>
      <Modal.Body>
        <Tab.Frame>
          <Tab.TabPane display="Static">
            <div className="w-full overflow-auto">
              <Preview
                project={project}
                duration={duration}
                animate={false}
                activeFrameIndex={activeFrameIndex}
                cellSize={10}
              />
            </div>
          </Tab.TabPane>
          <Tab.TabPane display="Animation">
            <div className="w-full overflow-auto">
              <Preview
                project={project}
                duration={duration}
                animate={true}
                cellSize={10}
              />
            </div>
          </Tab.TabPane>
        </Tab.Frame>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default PreviewModal;
