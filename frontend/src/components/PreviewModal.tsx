import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { Modal } from "./common/Modal";
import { closeModal } from "../store";
import Preview from "./Preview";
import { useState } from "react";

const PreviewModal = () => {
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();

  const [animate, setAnimate] = useState(false);

  const handleToggleAnimate = () => {
    setAnimate((prevAnimate) => !prevAnimate);
  };

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
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="view-type"
              className="inline-flex cursor-pointer items-center rounded bg-neutral-900 p-1 text-gray-100"
            >
              <input
                id="view-type"
                type="checkbox"
                role="switch"
                className="peer hidden"
                onChange={handleToggleAnimate}
                checked={animate}
              />
              <span
                aria-hidden="true"
                className="rounded bg-primary-color px-4 py-2 text-sm text-black peer-checked:bg-neutral-900 peer-checked:text-gray-100"
              >
                Static
              </span>
              <span
                aria-hidden="true"
                className="rounded bg-neutral-900 px-4 py-2 text-sm peer-checked:bg-primary-color peer-checked:text-black"
              >
                Animation
              </span>
            </label>
          </div>
          <Preview animate={animate} cellSize={10} />
        </div>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default PreviewModal;
