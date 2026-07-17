import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  googleLoginUser,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../api/authApi";

const getErrorMessage = (error, fallback) => {
  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail[0]?.msg || fallback;
  }

  if (typeof detail === "string") {
    return detail;
  }

  return fallback;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await registerUser(data);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Registration failed.")
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await loginUser(data);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Login failed.")
      );
    }
  }
);

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (credential, thunkAPI) => {
    try {
      const response = await googleLoginUser(credential);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Google sign-in failed.")
      );
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const response = await forgotPasswordRequest(email);
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to send reset link.")
      );
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const response = await resetPasswordRequest(data);
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to reset password.")
      );
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      return await getCurrentUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to fetch user.")
      );
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");

  return true;
});