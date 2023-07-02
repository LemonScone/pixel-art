import { AxiosError } from "axios";
import { createContext } from "react";

export type User = {
  userId: string;
  nickname: string;
  current: number;
  provider: string;
};

export type Auth = {
  user: User;
  accessToken: string;
};

export type SignInCredencials = {
  userId: string;
  password: string;
};

export type AuthContextData = {
  signIn: (credencials: SignInCredencials) => Promise<void | AxiosError>;
  signOut: () => void;
  auth: Auth;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
