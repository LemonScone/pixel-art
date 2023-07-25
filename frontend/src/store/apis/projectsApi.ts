import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import type { Project } from "../../types/Project";
import { baseQueryWithLocalStorage } from "../baseQueryWithLocalStorage";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: baseQueryWithLocalStorage({
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
      addProject: builder.mutation<Project, Project>({
        query: (project) => {
          return {
            url: "/projects",
            method: "POST",
            body: {
              ...project,
            },
          };
        },
      }),
    };
  },
});

export const { useLazyFetchProjectsQuery, useAddProjectMutation } = projectsApi;
export { projectsApi };
