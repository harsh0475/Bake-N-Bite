import api from "../../../1_app/axios";

export const createReview = async (data) => {
  const response = await api.post("/reviews/", data);
  return response.data;
};

export const updateReview = async (id, data) => {
  const response = await api.put(`/reviews/${id}`, data);
  return response.data;
};

export const getMyReviews = async () => {
  const response = await api.get("/reviews/my");
  return response.data;
};