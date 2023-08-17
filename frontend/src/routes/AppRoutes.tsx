import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root, ErrorPage } from "../pages";
import { PublicRoute } from "./PublicRoute";
import { ResetPasswordRoute } from "./ResetPasswordRoute";

const Editor = React.lazy(() => import("../pages/Editor"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const SignHelp = React.lazy(() => import("../pages/SignHelp"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));

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
            <Route
              path="signhelp"
              element={
                <PublicRoute>
                  <SignHelp />
                </PublicRoute>
              }
            />
            <Route
              path="reset-password"
              element={
                <ResetPasswordRoute>
                  <ResetPassword />
                </ResetPasswordRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
