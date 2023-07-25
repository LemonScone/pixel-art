import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import type { Project } from "../../types/Project";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth.data;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchProjects: builder.query<Project[], void>({
        query: () => {
          return {
            url: "/projects",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useLazyFetchProjectsQuery } = projectsApi;
export { projectsApi };
