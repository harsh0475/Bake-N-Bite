import api from "../../../1_app/axios";

export const changePasswordRequest = async ({
  current_password,
  new_password,
}) => {
  const response = await api.put("/users/change-password", {
    current_password,
    new_password,
  });

  return response.data;
};