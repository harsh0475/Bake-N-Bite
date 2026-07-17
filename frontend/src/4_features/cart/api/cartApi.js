import api from "../../../1_app/axios";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (data) => {
  const response = await api.post("/cart/items", data);
  return response.data;
};

export const updateCartItem = async (id, data) => {
  const response = await api.put(`/cart/items/${id}`, data);
  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await api.delete(`/cart/items/${id}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/clear");
  return response.data;
};