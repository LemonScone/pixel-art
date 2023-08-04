import { useSearchParams } from "react-router-dom";

import { Modal } from "./common/Modal";
import { Artwork } from "../types/Project";
import Preview from "./Preview";

const GalleryModal = ({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Artwork;
}) => {
  const [params, setParams] = useSearchParams();

  return (
    <Modal.Frame
      open={open}
      onClose={() => {
        params.delete("modal");
        setParams(params);
        onClose();
      }}
      size="7xl"
    >
      <Modal.Body>
        <div className="flex justify-center">
          <div className="overflow-auto">
            {open && (
              <Preview
                project={project}
                duration={1}
                animate={true}
                cellSize={5}
              />
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default GalleryModal;
