import {
  AnyAction,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { Toast, ToastPosition } from "../../types/Toast";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

const initialState = {
  data: [] as Toast[],
  position: "top-right" as ToastPosition,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    sendNotification(state, action: PayloadAction<Toast>) {
      const { id, type, message } = action.payload;
      state.data.push({ id, type, message });
    },
    dismissNotification(state, action: PayloadAction<number>) {
      return {
        ...state,
        data: state.data.filter((toast) => toast.id !== action.payload),
      };
    },
  },
});

export const toast = ({
  message,
  type,
  timeout = 5000,
}: Omit<Toast, "id"> & { timeout?: number }): ThunkResult<void> => {
  return async (dispatch) => {
    const id = Date.now();
    dispatch(sendNotification({ id, type, message }));

    setTimeout(() => dispatch(dismissNotification(id)), timeout);
  };
};

export const { sendNotification, dismissNotification } =
  notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
