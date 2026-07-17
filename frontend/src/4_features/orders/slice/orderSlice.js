import { createSlice } from "@reduxjs/toolkit";

import {
  fetchOrderThunk,
  fetchMyOrdersThunk,
} from "../thunk/orderThunk";

const initialState = {
  orders: [],

  selectedOrder: null,

  loading: false,

  error: null,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {

    // =====================================================
    // Clear Selected Order
    // =====================================================

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },

    // =====================================================
    // Clear Error
    // =====================================================

    clearOrderError: (state) => {
      state.error = null;
    },

    // =====================================================
    // Reset Orders State
    // =====================================================

    resetOrders: () => initialState,

  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // Fetch My Orders
      // =====================================================

      .addCase(
        fetchMyOrdersThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMyOrdersThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )

      .addCase(
        fetchMyOrdersThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Fetch Single Order
      // =====================================================

      .addCase(
        fetchOrderThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchOrderThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedOrder = action.payload;
        }
      )

      .addCase(
        fetchOrderThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

  },

});

export const {
  clearSelectedOrder,
  clearOrderError,
  resetOrders,
} = orderSlice.actions;

export default orderSlice.reducer;