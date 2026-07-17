import api from "../../../1_app/axios";

// ==========================================================
// Checkout
// ==========================================================

export const checkout = async (
  data
) => {

  const response =
    await api.post(
      "/orders/checkout",
      data
    );

  return response.data;

};