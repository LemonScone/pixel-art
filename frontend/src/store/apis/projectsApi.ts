import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState, dismissNotification, sendNotification } from "..";
import { projectsQuery } from "../projectsQuery";

import type { Project } from "../../types/Project";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: projectsQuery({
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
      fetchProject: builder.query<Project, number>({
        query: (projectId) => {
          return {
            url: `/projects/${projectId}`,
            method: "GET",
          };
        },
      }),
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
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          const id = Date.now();
          dispatch(
            sendNotification({
              id,
              type: "success",
              message: "Drawing saved",
            })
          );

          setTimeout(() => {
            dispatch(dismissNotification(id));
          }, 5000);
        },
      }),
      updateProject: builder.mutation<Project, Project>({
        query: (project) => {
          return {
            url: `/projects/${project.id}`,
            method: "PATCH",
            body: {
              ...project,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchProjectsQuery,
  useFetchProjectQuery,
  useLazyFetchProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;
export { projectsApi };
