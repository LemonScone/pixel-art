import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import {
  FetchArgs,
  FetchBaseQueryArgs,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import {
  getDataFromStorage,
  removeProjectFromStorage,
  saveProjectToStorage,
  updateProjectFromStorage,
} from "../utils/storage";

import httpMethod from "../constants/httpMethod";

import { pause } from "../utils/pause";
import { randomStr } from "../utils/random";

import { RootState, updateCurrent } from ".";

const projectsQuery = ({ baseUrl, prepareHeaders }: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });
  return async (args: FetchArgs, api: BaseQueryApi) => {
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
      const localStorageData = getDataFromStorage();
      await pause();
      if (localStorageData.stored.length) {
        api.dispatch(updateCurrent(localStorageData.currentProjectId));
        return { data: localStorageData.stored };
      }
      return { data: [] };
    }
    case httpMethod.POST: {
      const { id, ...rest } = body;
      saveProjectToStorage({ id: randomStr(), ...rest });
      await pause(500);
      return { data: body };
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
      }
      return { data: "" };
    }
    default:
      return { data: "" };
  }
};

export { projectsQuery };
