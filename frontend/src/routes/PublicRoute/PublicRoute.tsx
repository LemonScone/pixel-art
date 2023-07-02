import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuth";

import type Children from "../../types/Children";

const PublicRoute = (props: Children) => {
  const { children } = props;

  const { auth } = useAuthContext();

  return auth?.accessToken ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
