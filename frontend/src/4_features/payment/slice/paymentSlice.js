import { createSlice } from "@reduxjs/toolkit";

import {
  createRazorpayOrderThunk,
  verifyPaymentThunk,
  retryPaymentThunk,
  fetchPaymentThunk,
  changePaymentMethodThunk,
} from "../thunk/paymentThunk";

const initialState = {
  razorpayOrder: null,

  payment: null,

  loading: false,

  verifying: false,

  error: null,
};

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    clearPaymentState: (state) => {
      state.razorpayOrder = null;
      state.payment = null;
      state.loading = false;
      state.verifying = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // Create Razorpay Order
      // =====================================================

      .addCase(
        createRazorpayOrderThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createRazorpayOrderThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.razorpayOrder = action.payload;
        }
      )

      .addCase(
        createRazorpayOrderThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Verify Payment
      // =====================================================

      .addCase(
        verifyPaymentThunk.pending,
        (state) => {
          state.verifying = true;
          state.error = null;
        }
      )

      .addCase(
        verifyPaymentThunk.fulfilled,
        (state, action) => {
          state.verifying = false;
          state.payment = action.payload;
        }
      )

      .addCase(
        verifyPaymentThunk.rejected,
        (state, action) => {
          state.verifying = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Retry Payment
      // =====================================================

      .addCase(
        retryPaymentThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        retryPaymentThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.razorpayOrder = action.payload;
        }
      )

      .addCase(
        retryPaymentThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Fetch Payment
      // =====================================================

      .addCase(
        fetchPaymentThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchPaymentThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.payment = action.payload;
        }
      )

      .addCase(
        fetchPaymentThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Change Payment Method
      // =====================================================

      .addCase(
        changePaymentMethodThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        changePaymentMethodThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.payment = action.payload;
        }
      )

      .addCase(
        changePaymentMethodThunk.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export const {
  clearPaymentState,
} = paymentSlice.actions;

export default paymentSlice.reducer;