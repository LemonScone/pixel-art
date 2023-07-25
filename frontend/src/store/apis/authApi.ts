import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState, resetAuth, setAuth } from "..";
import { Auth, SignInCredentials, SignUpParams, User } from "../../types/Auth";
import { ONE_MINUTE } from "../../constants";

type LoginResponse = Omit<Auth, "user"> & User;

const authApi = createApi({
  reducerPath: "authApi",
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
  tagTypes: ["Refresh"],
  endpoints(builder) {
    return {
      login: builder.mutation<LoginResponse, SignInCredentials>({
        query: (credencials) => {
          return {
            url: "/auth/signin",
            method: "POST",
            body: credencials,
          };
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            const { accessToken, expired, ...user } = data;
            dispatch(
              setAuth({
                user,
                expired,
                accessToken,
              })
            );

            const refreshToken = async () => {
              await dispatch(authApi.util.invalidateTags(["Refresh"]));
              dispatch(resetAuth());
            };
            setTimeout(refreshToken, expired - ONE_MINUTE);
          } catch (error) {
            // error catch
          }
        },
      }),
      refresh: builder.query<LoginResponse, void>({
        query: () => {
          return {
            url: "/auth/refresh",
            method: "POST",
          };
        },
        providesTags: ["Refresh"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            const { accessToken, expired, ...user } = data;
            dispatch(
              setAuth({
                user,
                expired,
                accessToken,
              })
            );

            const refreshToken = async () => {
              await dispatch(authApi.util.invalidateTags(["Refresh"]));
              dispatch(resetAuth());
            };
            setTimeout(refreshToken, expired - ONE_MINUTE);
          } catch (error) {
            // error catch
          }
        },
      }),
      signup: builder.mutation<void, SignUpParams>({
        query: (params) => {
          return {
            url: "auth/signup",
            method: "POST",
            body: params,
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useSignupMutation, useRefreshQuery } = authApi;
export { authApi };
