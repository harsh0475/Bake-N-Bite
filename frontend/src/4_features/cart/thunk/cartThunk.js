import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cartApi";

export const fetchCartThunk = createAsyncThunk(
  "cart/fetch",
  async (_, thunkAPI) => {
    // Capture the cart "version" at the moment this fetch starts.
    // If a mutation (add/update/remove/clear) completes before this
    // request resolves, the version will have moved on and we must
    // not let this stale response overwrite the newer cart state.
    const startVersion = thunkAPI.getState().cart.version;

    try {
      const cart = await getCart();
      return { cart, startVersion };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Unable to fetch cart."
      );
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    try {
      await addToCart(data);

      const cart = await getCart();

      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Unable to add product."
      );
    }
  }
);

export const updateCartThunk = createAsyncThunk(
  "cart/update",
  async ({ id, data }, thunkAPI) => {
    try {
      await updateCartItem(id, data);

      const cart = await getCart();

      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail
      );
    }
  }
);

export const removeCartThunk = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    try {
      await removeCartItem(id);

      const cart = await getCart();

      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail ||
        "Unable to remove item."
      );
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  "cart/clear",
  async (_, thunkAPI) => {
    try {
      await clearCart();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail
      );
    }
  }
);