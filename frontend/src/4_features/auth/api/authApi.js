import api from "../../../1_app/axios";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const googleLoginUser = async (credential) => {
  const response = await api.post("/auth/google", { credential });
  return response.data;
};

export const forgotPasswordRequest = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPasswordRequest = async ({ token, new_password }) => {
  const response = await api.post("/auth/reset-password", {
    token,
    new_password,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};