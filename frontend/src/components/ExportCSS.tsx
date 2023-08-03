import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { toast } from "../store";

import Button from "./common/Button";
import { ClipboardIcon } from "@heroicons/react/24/outline";

import { Frame } from "../types/Project";

import { useHighlight } from "../hooks/useHighlight";
import {
  generateAnimationCSSClass,
  generateImageCssClass,
} from "../utils/cssParse";

const ExportCSS = ({ animate }: { animate: boolean }) => {
  const { renderHighlight } = useHighlight("css");

  const dispatch = useAppDispatch();
  const {
    frames,
    cellSize,
    gridColumns: columns,
  } = useAppSelector((state) => state.projects.present.data);
  const currentFrameId = useAppSelector(
    (state) => state.projects.present.currentFrameId
  );
  const duration = useAppSelector((state) => state.projects.present.duration);

  const activeFrame = frames.find(
    (frame) => frame.id === currentFrameId
  ) as Frame;

  const animation = frames.length > 1 && animate;

  let cssClass = "";
  if (animation) {
    cssClass = generateAnimationCSSClass({
      frames,
      cellSize,
      columns,
      duration,
    });
  } else {
    cssClass = generateImageCssClass({
      frame: activeFrame,
      columns,
      cellSize,
    });
  }

  const handleClickCopy = (cssClass: string) => {
    if (!navigator.clipboard) {
      return;
    }
    try {
      navigator.clipboard.writeText(cssClass);
      dispatch(toast({ type: "success", message: "Copied to clipboard" }));
    } catch (err) {
      dispatch(toast({ type: "failure", message: "Failed to copy!" }));
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <p
          className="h-40 overflow-scroll whitespace-pre rounded bg-neutral-900 p-2"
          dangerouslySetInnerHTML={{
            __html: renderHighlight(cssClass) ?? "",
          }}
        ></p>
        <Button
          className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-primary-color p-2  active:animate-copy"
          onClick={() => handleClickCopy(cssClass)}
        >
          <ClipboardIcon className="h-5 w-5 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default ExportCSS;
