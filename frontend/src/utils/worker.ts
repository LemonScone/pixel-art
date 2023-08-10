import { convertImage } from "./pixelsToSvg";

onmessage = (e) => {
  const converted = convertImage(e.data);
  postMessage(converted);
};
