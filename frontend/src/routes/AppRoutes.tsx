import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root, ErrorPage } from "../pages";
import AuthProvider from "../providers/AuthProvider";
import { PublicRoute } from "./PublicRoute";

const Editor = React.lazy(() => import("../pages/Editor"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const SignIn = React.lazy(() => import("../pages/SignIn"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
