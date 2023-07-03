import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectsReducer } from "./slices/projectsSlice";
import { setAuth, resetAuth, authReducer } from "./slices/authSlice";

import type { PreloadedState } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     projects: projectsReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
};

export { setAuth, resetAuth };
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
