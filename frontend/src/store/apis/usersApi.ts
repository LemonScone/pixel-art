import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { usersQuery } from "../usersQuery";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: usersQuery({
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
      updateCurrent: builder.mutation<number | string, number | string>({
        query: (current) => {
          return {
            url: "/users/current",
            method: "PATCH",
            body: {
              current,
            },
          };
        },
      }),
    };
  },
});

export const { useUpdateCurrentMutation } = usersApi;
export { usersApi };
