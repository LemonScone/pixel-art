import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, ErrorPage, Editor, Gallery, SignIn } from "../pages";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Editor />,
        },
        {
          path: "gallery",
          element: <Gallery />,
        },
        {
          path: "login",
          element: <SignIn />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
