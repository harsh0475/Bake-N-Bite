import api from "../../../1_app/axios";

// ======================================================
// Get My Orders
// ======================================================

export const getMyOrders = async () => {

  const response = await api.get(
    "/orders"
  );

  return response.data;

};

// ======================================================
// Get Single Order
// ======================================================

export const getOrder = async (
  orderId
) => {

  const response = await api.get(
    `/orders/${orderId}`
  );

  return response.data;

};

// ======================================================
// Future APIs
// ======================================================

// export const cancelOrder = async (orderId) => {
//   const response = await api.post(
//     `/orders/${orderId}/cancel`
//   );
//
//   return response.data;
// };

// export const trackOrder = async (orderId) => {
//   const response = await api.get(
//     `/orders/${orderId}/track`
//   );
//
//   return response.data;
// };