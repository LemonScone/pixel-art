import { GIFEncoder, quantize, applyPalette } from "gifenc";
import type { FileType } from "../types/FileType";
import type { Frame } from "../types/Project";
import { randomStr } from "./random";

const download = ({
  buffer,
  filename,
  type = "image/png",
}: {
  buffer: Blob;
  filename: string;
  type?: string;
}) => {
  const blob = buffer instanceof Blob ? buffer : new Blob([buffer], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
};

const drawCanvasWithFrame = ({
  ctx,
  frameInfo,
}: {
  ctx: CanvasRenderingContext2D;
  frameInfo: FrameInfo;
}) => {
  const { frame, cols, cellSize, frameHeight, frameIdx } = frameInfo;
  frame.grid.forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return;
    }
    ctx.fillStyle = fillStyle;

    const col = pixelIdx % cols;
    const row = Math.floor(pixelIdx / cols);

    ctx.fillRect(
      col * cellSize,
      row * cellSize + frameHeight * frameIdx,
      cellSize,
      cellSize
    );
  });
  return ctx;
};

const renderPixelToCanvas = ({
  type,
  canvasData,
  currentFrameData,
  frames,
}: {
  type: FileType;
  canvasData: CanvasData;
  currentFrameData: FrameData;
  frames: Frame[];
}) => {
  const { canvas, canvasHeight, canvasWidth } = canvasData;
  const { frame, frameHeight, frameWidth, cellSize } = currentFrameData;
  const cols = Math.floor(frameWidth / cellSize);

  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.canvas.height = canvasHeight;
  ctx.canvas.width = canvasWidth;

  switch (type) {
    case "Sprite":
      frames.forEach((frame, frameIdx) => {
        ctx = drawCanvasWithFrame({
          ctx,
          frameInfo: {
            frame,
            cols,
            cellSize,
            frameHeight,
            frameIdx,
          },
        });
      });

      break;
    default:
      ctx = drawCanvasWithFrame({
        ctx,
        frameInfo: {
          frame,
          cols,
          cellSize,
          frameHeight,
          frameIdx: 0,
        },
      });
      break;
  }

  return ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
};

const getPaletteWithTransparent = (data: Uint8ClampedArray) => {
  const format = "rgba4444";
  const palette = quantize(data, 256, {
    format,
    oneBitAlpha: true,
  });
  let transparent = true;
  const transparentIndex = palette.findIndex((p: number[]) => p[3] === 0);
  if (transparentIndex === -1) {
    transparent = false;
  }
  const index = applyPalette(data, palette, format);

  return { palette, index, transparent, transparentIndex };
};

const downloadFrames = ({
  type,
  frames,
  duration,
  activeFrame,
  rows,
  columns,
  cellSize,
}: {
  type: FileType;
  frames: Frame[];
  duration: number;
  activeFrame: Frame;
  rows: number;
  columns: number;
  cellSize: number;
}) => {
  const frameHeight = rows * cellSize;
  const frameWidth = columns * cellSize;
  const canvasHeight =
    type === "Sprite" ? frameHeight * frames.length : frameHeight;
  const canvasWidth = frameWidth;

  const canvas = document.createElement("canvas");
  const gif = new GIFEncoder();
  switch (type) {
    case "PNG":
    case "Sprite": {
      const canvasData = {
        canvas,
        canvasHeight,
        canvasWidth,
      };
      const currentFrameData = {
        frame: activeFrame,
        frameHeight,
        frameWidth,
        cellSize,
      };
      renderPixelToCanvas({
        type,
        canvasData,
        currentFrameData,
        frames,
      });

      canvas.toBlob(function (buffer) {
        if (buffer) {
          const filename = `${randomStr()}.png`;
          download({ buffer, filename });
        }
      });

      break;
    }

    default: {
      frames.forEach((frame, idx, framesArray) => {
        const lastFrame = idx === framesArray.length - 1;
        const currentInterval = lastFrame ? 100 : frames[idx].animateInterval;
        const durationInMillisecond = duration * 1000;
        const delay = (currentInterval / 1000) * durationInMillisecond;

        const canvasData = {
          canvas,
          canvasHeight,
          canvasWidth,
        };
        const currentFrameData = {
          frame,
          frameHeight,
          frameWidth,
          cellSize,
        };
        const data = renderPixelToCanvas({
          type,
          canvasData,
          currentFrameData,
          frames,
        });

        const { palette, index, transparent, transparentIndex } =
          getPaletteWithTransparent(data);

        gif.writeFrame(index, canvasWidth, canvasHeight, {
          palette,
          delay,
          transparent,
          transparentIndex,
        });
      });
      gif.finish();

      const buffer = gif.bytesView();
      const filename = `${randomStr()}.gif`;
      download({ buffer, filename, type: "image/gif" });
    }
  }
};

type CanvasData = {
  canvas: HTMLCanvasElement;
  canvasHeight: number;
  canvasWidth: number;
};

type FrameData = {
  frame: Frame;
  frameHeight: number;
  frameWidth: number;
  cellSize: number;
};

type FrameInfo = {
  frame: Frame;
  cols: number;
  cellSize: number;
  frameHeight: number;
  frameIdx: number;
};

export default downloadFrames;
