import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCategoriesThunk,
  fetchCategoryThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
  uploadCategoryImageThunk,
  deleteCategoryImageThunk,
} from "../thunk/categoryThunk";

const initialState = {
  categories: [],

  selectedCategory: null,

  loading: {
    categories: false,
    category: false,
    create: false,
    update: false,
    delete: false,
    uploadImage: false,
    deleteImage: false,
  },

  error: {
    categories: null,
    category: null,
    create: null,
    update: null,
    delete: null,
    uploadImage: null,
    deleteImage: null,
  },
};

const updateCategoryInList = (
  categories,
  updatedCategory
) => {
  const exists = categories.some(
    (category) =>
      category.id === updatedCategory.id
  );

  if (!exists) {
    return categories;
  }

  return categories.map((category) =>
    category.id === updatedCategory.id
      ? updatedCategory
      : category
  );
};

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================================================
      // Fetch Categories
      // ======================================================

      .addCase(
        fetchCategoriesThunk.pending,
        (state) => {
          state.loading.categories = true;
          state.error.categories = null;
        }
      )

      .addCase(
        fetchCategoriesThunk.fulfilled,
        (state, action) => {
          state.loading.categories = false;
          state.categories = action.payload;
        }
      )

      .addCase(
        fetchCategoriesThunk.rejected,
        (state, action) => {
          state.loading.categories = false;
          state.error.categories =
            action.payload;
        }
      )

      // ======================================================
      // Fetch Category
      // ======================================================

      .addCase(
        fetchCategoryThunk.pending,
        (state) => {
          state.loading.category = true;
          state.error.category = null;
        }
      )

      .addCase(
        fetchCategoryThunk.fulfilled,
        (state, action) => {
          state.loading.category = false;
          state.selectedCategory =
            action.payload;
        }
      )

      .addCase(
        fetchCategoryThunk.rejected,
        (state, action) => {
          state.loading.category = false;
          state.error.category =
            action.payload;
        }
      )

      // ======================================================
      // Create Category
      // ======================================================

      .addCase(
        createCategoryThunk.pending,
        (state) => {
          state.loading.create = true;
          state.error.create = null;
        }
      )

      .addCase(
        createCategoryThunk.fulfilled,
        (state, action) => {
          state.loading.create = false;

          state.categories.push(
            action.payload
          );
        }
      )

      .addCase(
        createCategoryThunk.rejected,
        (state, action) => {
          state.loading.create = false;
          state.error.create =
            action.payload;
        }
      )

      // ======================================================
      // Update Category
      // ======================================================

      .addCase(
        updateCategoryThunk.pending,
        (state) => {
          state.loading.update = true;
          state.error.update = null;
        }
      )

      .addCase(
        updateCategoryThunk.fulfilled,
        (state, action) => {
          state.loading.update = false;

          state.selectedCategory =
            action.payload;

          state.categories =
            updateCategoryInList(
              state.categories,
              action.payload
            );
        }
      )

      .addCase(
        updateCategoryThunk.rejected,
        (state, action) => {
          state.loading.update = false;
          state.error.update =
            action.payload;
        }
      )

      // ======================================================
      // Delete Category
      // ======================================================

      .addCase(
        deleteCategoryThunk.pending,
        (state) => {
          state.loading.delete = true;
          state.error.delete = null;
        }
      )

      .addCase(
        deleteCategoryThunk.fulfilled,
        (state, action) => {
          state.loading.delete = false;

          state.categories =
            state.categories.filter(
              (category) =>
                category.id !==
                action.payload
            );

          if (
            state.selectedCategory?.id ===
            action.payload
          ) {
            state.selectedCategory =
              null;
          }
        }
      )

      .addCase(
        deleteCategoryThunk.rejected,
        (state, action) => {
          state.loading.delete = false;
          state.error.delete =
            action.payload;
        }
      )

      // ======================================================
      // Upload Category Image
      // ======================================================

      .addCase(
        uploadCategoryImageThunk.pending,
        (state) => {
          state.loading.uploadImage = true;
          state.error.uploadImage = null;
        }
      )

      .addCase(
        uploadCategoryImageThunk.fulfilled,
        (state, action) => {
          state.loading.uploadImage = false;

          state.selectedCategory =
            action.payload;

          state.categories =
            updateCategoryInList(
              state.categories,
              action.payload
            );
        }
      )

      .addCase(
        uploadCategoryImageThunk.rejected,
        (state, action) => {
          state.loading.uploadImage = false;
          state.error.uploadImage =
            action.payload;
        }
      )

      // ======================================================
      // Delete Category Image
      // ======================================================

      .addCase(
        deleteCategoryImageThunk.pending,
        (state) => {
          state.loading.deleteImage = true;
          state.error.deleteImage = null;
        }
      )

      .addCase(
        deleteCategoryImageThunk.fulfilled,
        (state, action) => {
          state.loading.deleteImage = false;

          state.selectedCategory =
            action.payload;

          state.categories =
            updateCategoryInList(
              state.categories,
              action.payload
            );
        }
      )

      .addCase(
        deleteCategoryImageThunk.rejected,
        (state, action) => {
          state.loading.deleteImage = false;
          state.error.deleteImage =
            action.payload;
        }
      );
  },
});

export default categorySlice.reducer;