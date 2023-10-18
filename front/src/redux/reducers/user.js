import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.user = action.payload;
    state.loading = false;
  },
  LoadUserFail: (state, action) => {
    state.isAuthenticated = false;
    state.error = action.payload;
    state.loading = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});