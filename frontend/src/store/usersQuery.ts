import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import {
  FetchArgs,
  FetchBaseQueryArgs,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { updateCurrentProjectIdFromStorage } from "../utils/storage";

import httpMethod from "../constants/httpMethod";

import { RootState } from ".";

const usersQuery = ({ baseUrl, prepareHeaders }: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });
  return async (args: FetchArgs, api: BaseQueryApi) => {
    const loggedIn = (api.getState() as RootState).auth.data.accessToken;

    if (!loggedIn) {
      return await getDataFromLocalStorage(args);
    }
    return baseQuery(args, api, {});
  };
};

const getDataFromLocalStorage = async ({ method, body }: FetchArgs) => {
  switch (method) {
    case httpMethod.PATCH: {
      updateCurrentProjectIdFromStorage(body.current);
      return { data: body.current };
    }
    default:
      return { data: "" };
  }
};

export { usersQuery };
