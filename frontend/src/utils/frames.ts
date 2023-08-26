import { map, pipe, toArray } from "@fxts/core";
import { Frame, Project } from "../types/Project";

const framesToArray = (
  frameIds: Project["frameIds"],
  obj: Project["indexedFrames"]
) =>
  pipe(
    frameIds,
    map((id) => obj[id]),
    toArray
  );

const frameIds = (frames: Frame[]) =>
  pipe(
    frames,
    map(({ id }) => id),
    toArray
  );

export { framesToArray, frameIds };
