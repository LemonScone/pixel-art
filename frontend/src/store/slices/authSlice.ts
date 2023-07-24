import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "../../types/Auth";

type AuthData = {
  data: Auth;
};
const initialState: AuthData = {
  data: {
    user: {} as User,
    expired: 0,
    accessToken: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth>) {
      state.data = action.payload;
    },
    resetAuth(state) {
      state.data = {
        user: {} as User,
        expired: 0,
        accessToken: "",
      };
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
