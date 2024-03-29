import { useCallback, useDebugValue, useRef } from "react";
import { SignInCredentials, SignUpParams } from "../types/Auth";
import { resetAuth, setAuth } from "../store";
import { api, setAuthorizationHeader } from "../api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useLoginMutation } from "../store";
import { useSignupMutation } from "../store/apis/authApi";

const useAuth = () => {
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth.data);

  const intervalRef = useRef<NodeJS.Timer>();

  const navigate = useNavigate();

  useDebugValue(user, (user) => (user ? "Logged In" : "Logged Out"));

  const signUp = async (params: SignUpParams) => {
    const { email, password, username } = params;

    try {
      await signup({ email, password, username }).unwrap();
    } catch (error) {
      return error as AxiosError;
    }
  };

  const signIn = async (params: SignInCredentials) => {
    const { email, password } = params;

    try {
      await login({ email, password }).unwrap();
    } catch (error) {
      return error as AxiosError;
    }
  };

  const signOut = useCallback(
    async (pathname = "/") => {
      try {
        await api.post("/auth/signout");
      } catch (error) {
        return error as AxiosError;
      } finally {
        dispatch(resetAuth());
        clearInterval(intervalRef.current);
        setAuthorizationHeader(api.defaults, "");
        navigate(pathname);
      }
    },
    [navigate, dispatch]
  );

  const requestRefresh = useCallback(async () => {
    const response = await api.post("/auth/refresh");
    const { accessToken, expired, ...user } = response.data;
    dispatch(setAuth({ user, accessToken, expired }));
    setAuthorizationHeader(api.defaults, accessToken);

    return expired;
  }, [dispatch]);

  const silentRefresh = useCallback(async () => {
    try {
      await requestRefresh();
    } catch (error) {
      signOut(window.location.pathname);
    }
  }, [requestRefresh, signOut]);

  return {
    user,
    accessToken,
    signIn,
    signOut,
    signUp,
    silentRefresh,
    requestRefresh,
  };
};

export default useAuth;
