import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root, ErrorPage } from "../pages";

const Editor = React.lazy(() => import("../pages/Editor"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const SignIn = React.lazy(() => import("../pages/SignIn"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-black text-white">Loading...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route index element={<Editor />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="login" element={<SignIn />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
