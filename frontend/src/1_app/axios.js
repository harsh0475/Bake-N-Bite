import axios from "axios";

import {
  API_V1,
} from "../8_constants/config";

// ==========================================================
// Axios Instance
// ==========================================================

const api = axios.create({
  baseURL: API_V1,

  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================================
// Request Interceptor
// ==========================================================

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "access_token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// ==========================================================
// Response Interceptor
// ==========================================================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "access_token"
      );

      localStorage.removeItem(
        "user"
      );

      if (
        window.location.pathname !==
        "/login"
      ) {
        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;