import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts";

const useAuth = () => {
  const data = useContext(AuthContext);

  const { auth } = data;
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return data;
};

export default useAuth;
