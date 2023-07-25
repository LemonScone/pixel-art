import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { projectsReducer } from "./slices/projectsSlice";
import { setAuth, resetAuth, authReducer } from "./slices/authSlice";
import {
  changeSelectedTool,
  changePenColor,
  changePenSize,
  changeEraserSize,
  applyPencil,
  applyEraser,
  applyBucket,
  applyMove,
  increseColumn,
  decreseColumn,
  increseRow,
  decreseRow,
} from "./slices/projectsSlice";
import type { Middleware, PreloadedState } from "@reduxjs/toolkit";
import { projectsApi } from "./apis/projectsApi";
import { authApi } from "./apis/authApi";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const rtkQueryErrorLogger: Middleware = (_) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn("We got a rejected action!", action.error);
  }

  return next(action);
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        rtkQueryErrorLogger,
        projectsApi.middleware,
        authApi.middleware
      );
    },
  });
};

export { setAuth, resetAuth };
export { changeSelectedTool, changePenColor, changePenSize, changeEraserSize };
export { applyPencil, applyEraser, applyBucket, applyMove };
export { increseColumn, decreseColumn, increseRow, decreseRow };
export {
  useLazyFetchProjectsQuery,
  useAddProjectMutation,
} from "./apis/projectsApi";
export { useLoginMutation, useRefreshQuery } from "./apis/authApi";
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
