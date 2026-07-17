import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createReview,
  updateReview,
  getMyReviews,
} from "../api/reviewApi";

// ======================================================
// Error Helper
// ======================================================

const getErrorMessage = (
  error,
  fallback
) => {

  const detail =
    error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return (
      detail[0]?.msg ||
      fallback
    );
  }

  if (typeof detail === "string") {
    return detail;
  }

  return fallback;

};

// ======================================================
// Fetch My Reviews
// ======================================================

export const fetchMyReviewsThunk = createAsyncThunk(
  "reviews/fetchMy",
  async (_, thunkAPI) => {
    try {
      return await getMyReviews();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to fetch your reviews.")
      );
    }
  }
);

// ======================================================
// Create Review
// ======================================================

export const createReviewThunk = createAsyncThunk(
  "reviews/create",
  async (data, thunkAPI) => {
    try {
      return await createReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to submit review.")
      );
    }
  }
);

// ======================================================
// Update Review
// ======================================================

export const updateReviewThunk = createAsyncThunk(
  "reviews/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateReview(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to update review.")
      );
    }
  }
);