import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import {
  FetchArgs,
  FetchBaseQueryArgs,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { indexBy, map, pipe, toArray } from "@fxts/core";

import {
  getCurrentProjectFromStorage,
  getDataFromStorage,
  removeProjectFromStorage,
  saveProjectToStorage,
  updateProjectFromStorage,
} from "../utils/storage";
import { pause } from "../utils/pause";
import { randomStr } from "../utils/random";
import { frameIds } from "../utils/frames";

import httpMethod from "../constants/httpMethod";

import { RootState } from ".";

import { Project } from "../types/Project";

const projectsQuery = ({ baseUrl, prepareHeaders }: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });
  return async (args: FetchArgs, api: BaseQueryApi) => {
    if (api.endpoint === "fetchArtworks") {
      return baseQuery(args, api, {});
    }

    const loggedIn = (api.getState() as RootState).auth.data.accessToken;

    if (!loggedIn) {
      return await getDataFromLocalStorage(api, args);
    }
    return baseQuery(args, api, {});
  };
};

const getDataFromLocalStorage = async (
  api: BaseQueryApi,
  { method, body, url }: FetchArgs
) => {
  switch (method) {
    case httpMethod.GET: {
      if (api.endpoint === "fetchProjects") {
        const localStorageData = getDataFromStorage();
        await pause();
        if (localStorageData.stored.length) {
          const stored = localStorageData.stored as Project[];

          const data = pipe(
            stored,
            map((project: Project) => {
              const indexedFrames = indexBy((a) => a.id, project.frames);

              project["indexedFrames"] = indexedFrames;
              project["frameIds"] = frameIds(project.frames);
              return project;
            }),
            toArray
          );

          return { data };
        }
        return { data: [] };
      } else {
        const currentProject = getCurrentProjectFromStorage() as Project;
        if (currentProject) {
          const indexedFrames = indexBy((a) => a.id, currentProject.frames);

          currentProject["indexedFrames"] = indexedFrames;
          currentProject["frameIds"] = frameIds(currentProject.frames);
        }

        return { data: currentProject };
      }
    }
    case httpMethod.POST: {
      const { id, ...rest } = body;
      const storedData = saveProjectToStorage({
        ...rest,
        id: randomStr(),
        animate: rest.frameIds.length > 1,
      });
      await pause(500);
      return { data: storedData };
    }
    case httpMethod.PATCH: {
      const updatedProject = updateProjectFromStorage(body);
      if (updatedProject) {
        await pause(500);
        return { data: updatedProject };
      } else {
        return { data: body };
      }
    }
    case httpMethod.DELETE: {
      const regexPattern = /\/projects\/(.+)/;
      const match = url.match(regexPattern);
      if (match && match[1]) {
        removeProjectFromStorage(match[1]);
        return { data: { id: match[1] } };
      }
      return { data: "" };
    }
    default:
      return { data: "" };
  }
};

export { projectsQuery };
