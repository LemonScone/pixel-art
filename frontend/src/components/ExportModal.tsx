import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { toast } from "../store";

import { FileType } from "../types/FileType";

import downloadFrames from "../utils/downloadFrames";

import Preview from "./Preview";
import Button from "./common/Button";
import ExportCSS from "./ExportCSS";
import Toggle from "./common/Toggle";
import { Modal } from "./common/Modal";
import { Tab } from "./common/Tab";
import { useState } from "react";
import { framesToArray } from "../utils/frames";

const ExportModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { data, duration, currentFrameId } = useAppSelector(
    (state) => state.projects.present
  );
  const activeFrameIndex = data.frameIds.findIndex(
    (id) => id === currentFrameId
  );

  const [params, setParams] = useSearchParams();

  const [animate, setAnimate] = useState(false);

  const handleDownloadDrawing = (type: FileType) => {
    const {
      frameIds,
      indexedFrames,
      gridRows: rows,
      gridColumns: columns,
      cellSize,
    } = data;
    const activeFrame = indexedFrames[currentFrameId];
    const frames = framesToArray(frameIds, indexedFrames);

    dispatch(toast({ type: "information", message: "Downloading..." }));
    downloadFrames({
      type,
      frames,
      duration,
      activeFrame,
      rows,
      columns,
      cellSize,
    });
  };

  const handleToggleAnimation = () => {
    setAnimate((prevAnimate) => !prevAnimate);
  };

  return (
    <Modal.Frame
      open={open}
      onClose={() => {
        params.delete("modal");
        setParams(params);
        onClose();
      }}
      size="5xl"
    >
      <Modal.Head>Export</Modal.Head>
      <Modal.Body>
        <Tab.Frame>
          <Tab.TabPane display="File">
            <Toggle
              id="css-animation"
              label="Animation"
              disabled={data.frameIds.length <= 1}
              onChange={handleToggleAnimation}
              className="ml-1 mt-2"
              checked={animate}
            />
            <div className="flex w-full justify-center overflow-auto">
              <Preview
                project={data}
                duration={duration}
                animate={animate}
                cellSize={10}
                activeFrameIndex={activeFrameIndex}
              />
            </div>
            <div className="flex gap-1">
              <Button
                className="rounded bg-neutral-900 p-2"
                onClick={() => {
                  handleDownloadDrawing("PNG");
                }}
              >
                PNG
              </Button>
              <Button
                className="rounded bg-neutral-900 p-2"
                onClick={() => {
                  handleDownloadDrawing("SVG");
                }}
              >
                SVG
              </Button>
              <Button
                className="rounded bg-neutral-900 p-2"
                onClick={() => {
                  handleDownloadDrawing("GIF");
                }}
              >
                GIF
              </Button>
              <Button
                className="rounded bg-neutral-900 p-2"
                onClick={() => {
                  handleDownloadDrawing("Sprite");
                }}
              >
                Sprite
              </Button>
            </div>
          </Tab.TabPane>
          <Tab.TabPane display="CSS">
            <Toggle
              id="css-animation"
              label="Animation"
              disabled={data.frameIds.length <= 1}
              onChange={handleToggleAnimation}
              className="ml-1 mt-2"
              checked={animate}
            />
            <div className="w-full overflow-auto">
              <Preview
                project={data}
                duration={duration}
                animate={animate}
                cellSize={10}
                activeFrameIndex={activeFrameIndex}
              />
            </div>
            <ExportCSS animate={animate} />
          </Tab.TabPane>
        </Tab.Frame>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default ExportModal;
