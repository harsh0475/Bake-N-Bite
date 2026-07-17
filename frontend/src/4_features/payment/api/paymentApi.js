import api from "../../../1_app/axios";

// ======================================================
// Create Razorpay Order
// ======================================================

export const createRazorpayOrder = async (
  orderId
) => {
  const response = await api.post(
    `/payments/${orderId}/razorpay-order`
  );

  return response.data;
};

// ======================================================
// Verify Razorpay Payment
// ======================================================

export const verifyPayment = async (
  data
) => {
  const response = await api.post(
    "/payments/verify",
    data
  );

  return response.data;
};

// ======================================================
// Retry Payment
// ======================================================

export const retryPayment = async (
  orderId
) => {
  const response = await api.post(
    `/payments/${orderId}/retry`
  );

  return response.data;
};

// ======================================================
// Get Payment Details
// ======================================================

export const getPayment = async (
  orderId
) => {
  const response = await api.get(
    `/payments/order/${orderId}`
  );

  return response.data;
};

// ======================================================
// Change Payment Method
// ======================================================

export const changePaymentMethod = async ({
  orderId,
  paymentMethod,
}) => {
  const response = await api.patch(
    `/payments/${orderId}/method`,
    {
      payment_method: paymentMethod,
    }
  );

  return response.data;
};