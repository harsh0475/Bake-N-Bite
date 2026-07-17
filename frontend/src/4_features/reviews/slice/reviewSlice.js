import { createSlice } from "@reduxjs/toolkit";

import {
  fetchMyReviewsThunk,
  createReviewThunk,
  updateReviewThunk,
} from "../thunk/reviewThunk";

const initialState = {
  myReviews: [],

  loading: false,

  submitting: false,

  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",

  initialState,

  reducers: {

    // =====================================================
    // Clear Error
    // =====================================================

    clearReviewError: (state) => {
      state.error = null;
    },

  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // Fetch My Reviews
      // =====================================================

      .addCase(fetchMyReviewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myReviews = action.payload;
      })

      .addCase(fetchMyReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================================
      // Create Review
      // =====================================================

      .addCase(createReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })

      .addCase(createReviewThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.myReviews.push(action.payload);
      })

      .addCase(createReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // =====================================================
      // Update Review
      // =====================================================

      .addCase(updateReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })

      .addCase(updateReviewThunk.fulfilled, (state, action) => {
        state.submitting = false;

        const index = state.myReviews.findIndex(
          (review) => review.id === action.payload.id
        );

        if (index !== -1) {
          state.myReviews[index] = action.payload;
        }
      })

      .addCase(updateReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });

  },
});

export const { clearReviewError } = reviewSlice.actions;

export default reviewSlice.reducer;