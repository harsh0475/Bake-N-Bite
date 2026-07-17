import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProducts,
  getProduct,
  getProductsByCategory,
} from "../api/productApi";

// =======================================
// Get All Products
// =======================================

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async (filters = {}, thunkAPI) => {
    try {
      const data = await getProducts(filters);

      return data;
    } catch (error) {
      console.error("fetchProductsThunk Error", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.detail ??
        "Failed to fetch products."
      );
    }
  }
);

// =======================================
// Get Single Product
// =======================================

export const fetchProductThunk = createAsyncThunk(
  "products/fetchOne",
  async (id, thunkAPI) => {
    try {
      return await getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail ??
        "Failed to fetch product."
      );
    }
  }
);

// =======================================
// Get Products By Category
// =======================================

export const fetchProductsByCategoryThunk =
  createAsyncThunk(
    "products/fetchByCategory",
    async (categoryId, thunkAPI) => {
      try {
        return await getProductsByCategory(categoryId);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ??
          "Failed to fetch category products."
        );
      }
    }
  );