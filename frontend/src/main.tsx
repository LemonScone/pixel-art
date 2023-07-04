import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./store";

import AppRoutes from "./routes/AppRoutes";

import "./index.css";
import initialState from "./tests/fixtures/projectsStore";
import { VALID_USER } from "./tests/fixtures/auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider
      store={setupStore({
        projects: initialState,
        auth: { data: { user: VALID_USER, accessToken: "" } },
      })}
    >
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
