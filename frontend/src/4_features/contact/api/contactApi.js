import api from "../../../1_app/axios";

export const sendContactMessage = async (data) => {
  const response = await api.post("/contact/send-message", data);
  return response.data;
};