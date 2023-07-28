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

import { RootState } from ".";
import projectsStore from "../tests/fixtures/projectsStore";

const projectsQuery = ({ baseUrl, prepareHeaders }: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });
  return async (args: FetchArgs, api: BaseQueryApi) => {
    const loggedIn = (api.getState() as RootState).auth.data.accessToken;

    if (!loggedIn) {
      return await getDataFromLocalStorage(args);
    }
    return baseQuery(args, api, {});
  };
};

const getDataFromLocalStorage = async ({ method, body, url }: FetchArgs) => {
  switch (method) {
    case httpMethod.GET: {
      const localStorageData = getDataFromStorage();
      await pause();
      if (!localStorageData) {
        return { data: projectsStore };
      }
      return { data: localStorageData.stored };
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
