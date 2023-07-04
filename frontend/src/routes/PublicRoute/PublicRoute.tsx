import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import type Children from "../../types/Children";

const PublicRoute = (props: Children) => {
  const { children } = props;

  const { accessToken } = useAuth();

  return accessToken ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
