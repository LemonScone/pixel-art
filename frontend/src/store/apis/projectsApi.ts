import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

type Frame = {
  id: number;
  projectId: number;
  grid: string[];
  animateInterval: number;
};

type Project = {
  id: number;
  animate: boolean;
  cellSize: number;
  gridColumns: number;
  gridRows: number;
  pallete: string[];
  title: string;
  description: string;
  isPublished: boolean;

  frames: Frame[];
};
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

export const { useFetchProjectsQuery } = projectsApi;
export { projectsApi };
