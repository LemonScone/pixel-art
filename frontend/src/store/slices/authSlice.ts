import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "../../types/Auth";
import { usersApi } from "../apis/usersApi";

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
  extraReducers(builder) {
    builder.addMatcher(
      usersApi.endpoints.updateCurrent.matchFulfilled,
      (state, { payload }) => {
        state.data.user.current = payload;
      }
    );
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
