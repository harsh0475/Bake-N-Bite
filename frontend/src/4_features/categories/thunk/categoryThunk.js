import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  deleteCategoryImage,
} from "../api/categoryApi";

// ==========================================================
// Fetch Categories
// ==========================================================

export const fetchCategoriesThunk =
  createAsyncThunk(
    "categories/fetchAll",
    async (_, thunkAPI) => {
      try {
        return await getCategories();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to fetch categories."
        );
      }
    }
  );

// ==========================================================
// Fetch Category
// ==========================================================

export const fetchCategoryThunk =
  createAsyncThunk(
    "categories/fetchOne",
    async (id, thunkAPI) => {
      try {
        return await getCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to fetch category."
        );
      }
    }
  );

// ==========================================================
// Create Category
// ==========================================================

export const createCategoryThunk =
  createAsyncThunk(
    "categories/create",
    async (data, thunkAPI) => {
      try {
        return await createCategory(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to create category."
        );
      }
    }
  );

// ==========================================================
// Update Category
// ==========================================================

export const updateCategoryThunk =
  createAsyncThunk(
    "categories/update",
    async (
      { id, data },
      thunkAPI
    ) => {
      try {
        return await updateCategory(
          id,
          data
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to update category."
        );
      }
    }
  );

// ==========================================================
// Delete Category
// ==========================================================

export const deleteCategoryThunk =
  createAsyncThunk(
    "categories/delete",
    async (id, thunkAPI) => {
      try {
        await deleteCategory(id);

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to delete category."
        );
      }
    }
  );

// ==========================================================
// Upload Category Image
// ==========================================================

export const uploadCategoryImageThunk =
  createAsyncThunk(
    "categories/uploadImage",
    async (
      { categoryId, file },
      thunkAPI
    ) => {
      try {
        return await uploadCategoryImage(
          categoryId,
          file
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to upload image."
        );
      }
    }
  );

// ==========================================================
// Delete Category Image
// ==========================================================

export const deleteCategoryImageThunk =
  createAsyncThunk(
    "categories/deleteImage",
    async (
      categoryId,
      thunkAPI
    ) => {
      try {
        return await deleteCategoryImage(
          categoryId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Failed to delete image."
        );
      }
    }
  );