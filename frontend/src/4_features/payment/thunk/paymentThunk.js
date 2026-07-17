import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createRazorpayOrder,
  verifyPayment,
  retryPayment,
  getPayment,
  changePaymentMethod,
} from "../api/paymentApi";

// ======================================================
// Error Helper
// ======================================================

const getErrorMessage = (
  error,
  fallback
) => {

  const detail =
    error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return (
      detail[0]?.msg ||
      fallback
    );
  }

  if (typeof detail === "string") {
    return detail;
  }

  return fallback;

};

// ======================================================
// Create Razorpay Order
// ======================================================

export const createRazorpayOrderThunk =
  createAsyncThunk(
    "payment/createRazorpayOrder",

    async (
      orderId,
      thunkAPI
    ) => {

      try {

        return await createRazorpayOrder(
          orderId
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to create payment."
          )
        );

      }

    }
  );

// ======================================================
// Verify Payment
// ======================================================

export const verifyPaymentThunk =
  createAsyncThunk(
    "payment/verify",

    async (
      data,
      thunkAPI
    ) => {

      try {

        return await verifyPayment(
          data
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Payment verification failed."
          )
        );

      }

    }
  );

// ======================================================
// Retry Payment
// ======================================================

export const retryPaymentThunk =
  createAsyncThunk(
    "payment/retry",

    async (
      orderId,
      thunkAPI
    ) => {

      try {

        return await retryPayment(
          orderId
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to retry payment."
          )
        );

      }

    }
  );

// ======================================================
// Fetch Payment
// ======================================================

export const fetchPaymentThunk =
  createAsyncThunk(
    "payment/get",

    async (
      orderId,
      thunkAPI
    ) => {

      try {

        return await getPayment(
          orderId
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to fetch payment."
          )
        );

      }

    }
  );

// ======================================================
// Change Payment Method
// ======================================================

export const changePaymentMethodThunk =
  createAsyncThunk(
    "payment/changeMethod",

    async (
      {
        orderId,
        paymentMethod,
      },
      thunkAPI
    ) => {

      try {

        return await changePaymentMethod(
          {
            orderId,
            paymentMethod,
          }
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to change payment method."
          )
        );

      }

    }
  );