import { createSlice } from "@reduxjs/toolkit";

import { checkoutThunk } from "../thunk/checkoutThunk";

const initialState = {
  order: null,

  loading: false,

  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {

    // ======================================================
    // Reset Checkout State
    // ======================================================

    resetCheckout: (state) => {

      state.order = null;

      state.loading = false;

      state.error = null;

    },

  },

  extraReducers: (builder) => {

    builder

      // ======================================================
      // Checkout
      // ======================================================

      .addCase(
        checkoutThunk.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        checkoutThunk.fulfilled,
        (state, action) => {

          state.loading = false;

          state.error = null;

          state.order = action.payload;

        }
      )

      .addCase(
        checkoutThunk.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;

        }
      );

  },

});

export const {
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;