import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getOrder,
  getMyOrders,
} from "../api/orderApi";

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
// Fetch My Orders
// ======================================================

export const fetchMyOrdersThunk =
  createAsyncThunk(
    "orders/fetchMine",

    async (
      _,
      thunkAPI
    ) => {

      try {

        return await getMyOrders();

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to fetch orders."
          )
        );

      }

    }
  );

// ======================================================
// Fetch Single Order
// ======================================================

export const fetchOrderThunk =
  createAsyncThunk(
    "orders/fetchOne",

    async (
      orderId,
      thunkAPI
    ) => {

      try {

        return await getOrder(
          orderId
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to fetch order."
          )
        );

      }

    }
  );