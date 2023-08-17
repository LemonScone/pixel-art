import { Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import type Children from "../../types/Children";
import { useVerifyPasswordTokenQuery } from "../../store";

const ResetPasswordRoute = (props: Children) => {
  const { children } = props;
  const [searchParam] = useSearchParams();

  const { error } = useVerifyPasswordTokenQuery({
    token: searchParam.get("token") ?? "",
  });

  return error ? <Navigate to="/signhelp" /> : <>{children}</>;
};

export default ResetPasswordRoute;
