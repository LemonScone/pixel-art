import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root, ErrorPage } from "../pages";
import { PublicRoute } from "./PublicRoute";

const Editor = React.lazy(() => import("../pages/Editor"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-black text-lg text-primary-color">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route index element={<Editor />} />
            <Route path="gallery" element={<Gallery />} />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
