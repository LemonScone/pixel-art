import axios, { AxiosDefaults, AxiosRequestConfig } from "axios";

export const setAuthorizationHeader = (
  request: AxiosDefaults | AxiosRequestConfig | any,
  token: string
) => {
  request.headers.Authorization = `Bearer ${token}`;
};

export const api = axios.create({
  baseURL: "/api",
});
