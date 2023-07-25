import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import {
  FetchArgs,
  FetchBaseQueryArgs,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { getDataFromStorage, saveDataToStorage } from "../utils/storage";

import httpMethod from "../constants/httpMethod";

import { pause } from "../utils/pause";

import { RootState } from ".";

const baseQueryWithLocalStorage = ({
  baseUrl,
  prepareHeaders,
}: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });
  return async (
    args: FetchArgs,
    api: BaseQueryApi,
    extraOptions: { shout?: boolean }
  ) => {
    const { method, body } = args;
    const loggedIn = (api.getState() as RootState).auth.data.accessToken;

    if (loggedIn) {
      switch (method) {
        case httpMethod.GET: {
          const apiResult = await baseQuery(args, api, extraOptions);

          const localStorageData = getDataFromStorage();
          const stored = localStorageData ? localStorageData.stored : [];
          const data = [...(apiResult.data as []), ...stored];
          return { data };
        }
        case httpMethod.POST:
          return baseQuery(args, api, extraOptions);
        default:
          return baseQuery(args, api, extraOptions);
      }
    } else {
      switch (method) {
        case httpMethod.GET: {
          const localStorageData = getDataFromStorage() || [];
          await pause();
          return { data: localStorageData.stored || [] };
        }
        case httpMethod.POST: {
          saveDataToStorage(body);
          await pause();
          return { data: body };
        }
        default:
          return baseQuery(args, api, extraOptions);
      }
    }
  };
};

export { baseQueryWithLocalStorage };
