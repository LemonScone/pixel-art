import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState, toast } from "..";
import { projectsQuery } from "../projectsQuery";

import type { Artwork, Project } from "../../types/Project";

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
  tagTypes: ["Projects", "Project"],
  endpoints(builder) {
    return {
      fetchProject: builder.query<Project, void>({
        query: () => {
          return {
            url: "/projects/current",
            method: "GET",
          };
        },
      }),
      fetchProjects: builder.query<Project[], void>({
        providesTags: (result, _error, _projects) =>
          result
            ? [
                ...result.map((project) => ({
                  type: "Project" as const,
                  id: project.id,
                })),
                "Projects",
              ]
            : ["Projects"],
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
        invalidatesTags: ["Projects"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(
            toast({
              type: "success",
              message: "Drawing saved",
            })
          );
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
        invalidatesTags: (_result, _error, project) => {
          return [{ type: "Project", id: project.id }];
        },
      }),
      removeProject: builder.mutation<Project, Project>({
        query: (project) => {
          return {
            url: `/projects/${project.id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (_result, _error, project) => {
          return [{ type: "Project", id: project.id }];
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(
            toast({
              type: "success",
              message: "Drawing deleted",
            })
          );
        },
      }),
      updateProjectStatus: builder.mutation<void, Project>({
        query: (project) => {
          return {
            url: `/projects/${project.id}/status`,
            method: "PATCH",
            body: {
              status: !project.isPublished,
            },
          };
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          const { isPublished } = arg;
          dispatch(
            toast({
              type: "success",
              message: isPublished
                ? "The project has been unpublished."
                : "The project has been published.",
            })
          );
        },
      }),
      fetchArtworks: builder.query<Artwork[], void>({
        query: () => {
          return {
            url: "/artworks",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchProjectQuery,
  useFetchProjectsQuery,
  useLazyFetchProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useRemoveProjectMutation,
  useUpdateProjectStatusMutation,
  useFetchArtworksQuery,
} = projectsApi;
export { projectsApi };
