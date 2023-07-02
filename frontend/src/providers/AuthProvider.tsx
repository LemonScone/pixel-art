import { useState, useEffect, useCallback, useRef } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext, { SignInCredencials } from "../contexts";
import { Auth } from "../contexts/AuthContext";

import { AxiosError } from "axios";
import { api, setAuthorizationHeader } from "../api";

import type Children from "../types/Children";

import { ONE_MINUTE } from "../constants";

const AuthProvider = (props: Children) => {
  const { children } = props;

  const [auth, setAuth] = useState<Auth | null>(null);

  const intervalRef = useRef<NodeJS.Timer>();

  const navigate = useNavigate();

  const signIn = async (params: SignInCredencials) => {
    const { userId, password } = params;

    try {
      const response = await api.post("/auth/login", { userId, password });
      const { accessToken, expired, ...user } = response.data;
      setAuth({ user, accessToken });
      setAuthorizationHeader(api.defaults, accessToken);

      intervalRef.current = setInterval(() => {
        silentRefresh();
      }, expired - ONE_MINUTE);
    } catch (error) {
      return error as AxiosError;
    }
  };

  const signOut = useCallback(
    async (pathname = "/") => {
      try {
        await api.post("/auth/logout");
      } catch (error) {
        return error as AxiosError;
      } finally {
        clearAuth();
        navigate(pathname);
      }
    },
    [navigate]
  );

  const silentRefresh = useCallback(async () => {
    try {
      console.log("silent");
      await requestRefresh();
    } catch (error) {
      signOut(window.location.pathname);
    }
  }, [signOut]);

  const requestRefresh = async () => {
    const response = await api.post("/auth/refresh");
    const { accessToken, expired, ...user } = response.data;
    setAuth({ user, accessToken });
    setAuthorizationHeader(api.defaults, accessToken);

    return expired;
  };

  const clearAuth = () => {
    setAuth(null);
    clearInterval(intervalRef.current);
    setAuthorizationHeader(api.defaults, "");
  };

  useEffect(() => {
    const checkSignIn = async () => {
      try {
        const expired = await requestRefresh();

        if (!intervalRef.current) {
          intervalRef.current = setInterval(async () => {
            silentRefresh();
          }, expired - ONE_MINUTE);
        }
      } catch (error) {
        clearAuth();
      }
    };

    if (!auth) {
      checkSignIn();
    }
  }, [silentRefresh, auth]);

  return (
    <AuthContext.Provider
      value={{
        auth: auth as Auth,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
