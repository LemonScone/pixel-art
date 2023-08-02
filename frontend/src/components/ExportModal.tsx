import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { Modal } from "./common/Modal";
import { closeModal } from "../store";

import { FileType } from "../types/FileType";

import downloadFrames from "../utils/downloadFrames";

import {
  generateAnimationCSSClass,
  generateImageCssClass,
} from "../utils/cssParse";

import { useHighlight } from "../hooks/useHighlight";

import Preview from "./Preview";
import Button from "./common/Button";
import { Tab } from "./common/Tab";
import { Frame } from "../types/Project";

const ExportModal = () => {
  const { data, duration, currentFrameId } = useAppSelector(
    (state) => state.projects.present
  );
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();

  const [cssClass, setCssClass] = useState("");

  const { renderHighlight } = useHighlight("css");

  const handleDownloadDrawing = (type: FileType) => {
    const frames = data.frames;
    const activeFrame = frames.find((frame) => frame.id === currentFrameId);
    const rows = data.gridRows;
    const columns = data.gridColumns;
    const cellSize = data.cellSize;

    if (activeFrame) {
      downloadFrames({
        type,
        frames,
        duration,
        activeFrame,
        rows,
        columns,
        cellSize,
      });
    }
  };

  useEffect(() => {
    const activeFrame = data.frames.find(
      (frame) => frame.id === currentFrameId
    ) as Frame;

    setCssClass(
      renderHighlight(
        generateImageCssClass({
          frame: activeFrame,
          columns: data.gridColumns,
          cellSize: data.cellSize,
        })
      )
    );
  }, []);

  const handleToggleAnimation = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const animation = data.frames.length > 1 && checked;
    if (animation) {
      setCssClass(
        renderHighlight(
          generateAnimationCSSClass({
            frames: data.frames,
            cellSize: data.cellSize,
            columns: data.gridColumns,
            duration,
          })
        )
      );
    } else {
      const activeFrame = data.frames.find(
        (frame) => frame.id === currentFrameId
      ) as Frame;

      setCssClass(
        renderHighlight(
          generateImageCssClass({
            frame: activeFrame,
            columns: data.gridColumns,
            cellSize: data.cellSize,
          })
        )
      );
    }
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
        <Tab.Frame>
          <Tab.TabPane display="File">
            <Preview animate={true} cellSize={10} />
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
            <Preview animate={true} cellSize={10} />
            <div className="flex flex-col">
              <div className="mb-1 flex items-center">
                <label
                  htmlFor="css-animation"
                  className="mr-1 text-sm text-gray-100"
                >
                  Animation
                </label>
                <input
                  id="css-animation"
                  type="checkbox"
                  className="h-5 w-9 appearance-none rounded-full bg-neutral-900 shadow-inner transition-all duration-300 before:ml-0.5 before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-primary-color-600  checked:before:translate-x-full focus:outline-none"
                  onChange={handleToggleAnimation}
                  disabled={data.frames.length <= 1}
                />
              </div>
              <div>
                <p
                  className="h-40 overflow-scroll whitespace-pre rounded bg-neutral-900 p-2"
                  dangerouslySetInnerHTML={{ __html: cssClass ?? "" }}
                ></p>
              </div>
            </div>
          </Tab.TabPane>
        </Tab.Frame>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default ExportModal;
