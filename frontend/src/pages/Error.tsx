import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-gray-100"
    >
      <h1 className="text-5xl font-bold text-primary-color">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has been occurred.</p>
      <p>
        <i>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : "Unkown Error"}
        </i>
      </p>
    </div>
  );
};

export default Error;
