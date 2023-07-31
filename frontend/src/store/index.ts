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
  selectFrame,
  changeProject,
  reset,
  resetFrame,
  copyFrame,
  removeFrame,
  changeFrame,
  changeFrameInterval,
  changeFramesInterval,
  newFrame,
  reorderFrame,
} from "./slices/projectsSlice";
import {
  notificationsReducer,
  sendNotification,
  dismissNotification,
  toast,
} from "./slices/notificationSlice";

import type { Middleware, PreloadedState } from "@reduxjs/toolkit";
import { projectsApi } from "./apis/projectsApi";
import { authApi } from "./apis/authApi";
import { usersApi } from "./apis/usersApi";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  notifications: notificationsReducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
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
        authApi.middleware,
        usersApi.middleware
      );
    },
  });
};

export { setAuth, resetAuth };
export { changeSelectedTool, changePenColor, changePenSize, changeEraserSize };
export { sendNotification, dismissNotification, toast };
export { applyPencil, applyEraser, applyBucket, applyMove };
export { increseColumn, decreseColumn, increseRow, decreseRow };
export { changeProject, reset };
export {
  selectFrame,
  resetFrame,
  copyFrame,
  removeFrame,
  changeFrame,
  changeFrameInterval,
  changeFramesInterval,
  newFrame,
  reorderFrame,
};
export {
  useFetchProjectQuery,
  useFetchProjectsQuery,
  useLazyFetchProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useRemoveProjectMutation,
} from "./apis/projectsApi";
export { useLoginMutation, useRefreshQuery } from "./apis/authApi";
export { useUpdateCurrentMutation } from "./apis/usersApi";
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
