import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./store";

import AppRoutes from "./routes/AppRoutes";

import "./index.css";
import { initialProject } from "./tests/fixtures/projectsStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = setupStore({
  projects: initialProject,
});

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
