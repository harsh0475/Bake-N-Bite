import { createSlice } from "@reduxjs/toolkit";

import {
  loginThunk,
  registerThunk,
  getCurrentUserThunk,
  logoutThunk,
  googleLoginThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
} from "../thunk/authThunk";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,

  token: localStorage.getItem("access_token"),

  isAuthenticated: !!localStorage.getItem("access_token"),

  loading: false,

  error: null,

  // Forgot / Reset password
  forgotPasswordLoading: false,
  forgotPasswordMessage: null,
  forgotPasswordError: null,

  resetPasswordLoading: false,
  resetPasswordMessage: null,
  resetPasswordError: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearForgotPasswordState: (state) => {
      state.forgotPasswordMessage = null;
      state.forgotPasswordError = null;
    },

    clearResetPasswordState: (state) => {
      state.resetPasswordMessage = null;
      state.resetPasswordError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================
      // Register
      // ======================================

      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // Login
      // ======================================

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // Google Login
      // ======================================

      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // Forgot Password
      // ======================================

      .addCase(forgotPasswordThunk.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
        state.forgotPasswordMessage = null;
      })

      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordMessage = action.payload;
      })

      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload;
      })

      // ======================================
      // Reset Password
      // ======================================

      .addCase(resetPasswordThunk.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = null;
        state.resetPasswordMessage = null;
      })

      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordMessage = action.payload;
      })

      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.payload;
      })

      // ======================================
      // Current User
      // ======================================

      .addCase(getCurrentUserThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(getCurrentUserThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      })

      // ======================================
      // Logout
      // ======================================

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearForgotPasswordState, clearResetPasswordState } =
  authSlice.actions;

export default authSlice.reducer;