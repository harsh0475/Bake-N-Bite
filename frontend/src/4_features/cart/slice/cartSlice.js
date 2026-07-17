import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCartThunk,
  addToCartThunk,
  updateCartThunk,
  removeCartThunk,
  clearCartThunk,
} from "../thunk/cartThunk";

const initialState = {
  cart: null,

  loading: false,

  updating: false,

  error: null,

  // Bumped on every successful mutation (add/update/remove/clear).
  // Used to detect and discard stale fetchCart responses that
  // resolve after a newer mutation has already updated the cart.
  version: 0,
};

// Prefix for ids of items that only exist locally until the
// server confirms them (optimistic updates).
const OPTIMISTIC_PREFIX = "optimistic-";

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================================================
      // Fetch Cart
      // ======================================================

      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.loading = false;

        const { cart, startVersion } = action.payload;

        if (startVersion === state.version) {
          state.cart = cart;
        }
      })

      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Add To Cart
      // ======================================================

      .addCase(addToCartThunk.pending, (state, action) => {
        state.updating = true;

        if (!state.cart) {
          return;
        }

        const { product_id, quantity } = action.meta.arg;

        const existing = state.cart.items.find(
          (item) => item.product_id === product_id
        );

        if (existing) {

          existing.quantity += quantity;
          existing.subtotal = existing.unit_price * existing.quantity;

        } else {

          state.cart.items.push({
            id: `${OPTIMISTIC_PREFIX}${product_id}`,
            product_id,
            product_name: "",
            product_slug: "",
            product_image: null,
            unit_price: 0,
            quantity,
            subtotal: 0,
          });

        }

        state.cart.total_items =
          (state.cart.total_items || 0) + quantity;
      })

      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.cart = action.payload;
        state.version += 1;
      })

      .addCase(addToCartThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // ======================================================
      // Update Cart Item
      // ======================================================

      .addCase(updateCartThunk.pending, (state, action) => {
        state.updating = true;

        if (!state.cart) {
          return;
        }

        const { id, data } = action.meta.arg;

        const item = state.cart.items.find(
          (cartItem) => cartItem.id === id
        );

        if (item) {

          const diff = data.quantity - item.quantity;

          item.quantity = data.quantity;
          item.subtotal = item.unit_price * item.quantity;

          state.cart.total_items =
            (state.cart.total_items || 0) + diff;

        }
      })

      .addCase(updateCartThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.cart = action.payload;
        state.version += 1;
      })

      .addCase(updateCartThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // ======================================================
      // Remove Cart Item
      // ======================================================

      .addCase(removeCartThunk.pending, (state, action) => {
        state.updating = true;

        if (!state.cart) {
          return;
        }

        const id = action.meta.arg;

        const item = state.cart.items.find(
          (cartItem) => cartItem.id === id
        );

        if (item) {

          state.cart.total_items =
            (state.cart.total_items || 0) - item.quantity;

        }

        state.cart.items = state.cart.items.filter(
          (cartItem) => cartItem.id !== id
        );
      })

      .addCase(removeCartThunk.fulfilled, (state, action) => {
          state.updating = false;
          state.cart = action.payload;
          state.version += 1;
      })

      .addCase(removeCartThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // ======================================================
      // Clear Cart
      // ======================================================

      .addCase(clearCartThunk.pending, (state) => {
        state.updating = true;
      })

      .addCase(clearCartThunk.fulfilled, (state) => {
        state.updating = false;
        state.version += 1;

        if (state.cart) {
          state.cart.items = [];
          state.cart.total_items = 0;
          state.cart.subtotal = 0;
          state.cart.delivery_charge = 0;
          state.cart.packaging_charge = 0;
          state.cart.discount = 0;
          state.cart.grand_total = 0;
        }
      })

      .addCase(clearCartThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;