import { createSlice } from "@reduxjs/toolkit";

import {
  fetchProductsThunk,
  fetchProductThunk,
  fetchProductsByCategoryThunk,
} from "../thunk/productThunk";

const initialState = {
  products: [],
  categoryProducts: [],
  selectedProduct: null,

  loadingProducts: false,
  loadingProduct: false,

  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // -------------------------
      // All Products
      // -------------------------

      .addCase(fetchProductsThunk.pending, (state) => {
        state.loadingProducts = true;
        state.error = null;
      })

      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loadingProducts = false;

        state.products = action.payload;

      })

      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.payload;
      })

      // -------------------------
      // Single Product
      // -------------------------

      .addCase(fetchProductThunk.pending, (state) => {
        state.loadingProduct = true;
      })

      .addCase(fetchProductThunk.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductThunk.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })

      // -------------------------
      // Products By Category
      // -------------------------

      .addCase(
        fetchProductsByCategoryThunk.fulfilled,
        (state, action) => {
          state.categoryProducts = action.payload;
        }
      );
  },
});

export default productSlice.reducer;