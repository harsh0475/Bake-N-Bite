import { createAsyncThunk } from "@reduxjs/toolkit";

import { checkout } from "../api/checkoutApi";

// ==========================================================
// Checkout
// ==========================================================

export const checkoutThunk =
  createAsyncThunk(
    "checkout/placeOrder",

    async (
      data,
      thunkAPI
    ) => {

      try {

        const response =
          await checkout(
            data
          );

        return response;

      } catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.detail ||

          "Unable to place order."

        );

      }

    }
  );