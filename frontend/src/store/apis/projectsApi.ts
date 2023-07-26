import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState, dismissNotification, sendNotification } from "..";
import { baseQueryWithLocalStorage } from "../baseQueryWithLocalStorage";

import type { Project } from "../../types/Project";

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
    };
  },
});

export const { useLazyFetchProjectsQuery, useAddProjectMutation } = projectsApi;
export { projectsApi };
