import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDashboardStats,
  getAdminProducts,
  getAdminProduct,
  deleteAdminProduct,
  createAdminProduct,
  updateAdminProduct,
  getAdminOrders,
  getAdminOrder,
  updateAdminOrderStatus,
  updateAdminPaymentStatus,
  getAdminCustomers,
  getAdminCustomer,
  updateAdminCustomer,
  activateCustomer,
  deactivateCustomer,
  verifyCustomer,
  getAdminReviews,
  getAdminReview,
  replyReview,
  hideReview,
  showReview,
  deleteReview,
  getAnalyticsDashboard,
} from "../api/adminApi";

// ==========================================================
// Dashboard
// ==========================================================

export const fetchDashboardThunk =
  createAsyncThunk(
    "admin/dashboard",
    async (_, thunkAPI) => {
      try {
        return await getDashboardStats();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load dashboard."
        );
      }
    }
  );

// ==========================================================
// Products
// ==========================================================

export const fetchProductsThunk =
  createAsyncThunk(
    "admin/products",
    async (params = {}, thunkAPI) => {
      try {
        return await getAdminProducts(
          params
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load products."
        );
      }
    }
  );

// ==========================================================
// Single Product
// ==========================================================

export const fetchProductThunk =
  createAsyncThunk(
    "admin/product",
    async (
      productId,
      thunkAPI
    ) => {
      try {
        return await getAdminProduct(
          productId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load product."
        );
      }
    }
  );

// ==========================================================
// Delete Product
// ==========================================================

export const deleteProductThunk =
  createAsyncThunk(
    "admin/deleteProduct",
    async (
      productId,
      thunkAPI
    ) => {
      try {
        await deleteAdminProduct(
          productId
        );

        return productId;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to delete product."
        );
      }
    }
  );

// ==========================================================
// Create Product
// ==========================================================

export const createProductThunk =
  createAsyncThunk(
    "admin/createProduct",
    async (
      productData,
      thunkAPI
    ) => {
      try {
        return await createAdminProduct(
          productData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to create product."
        );
      }
    }
  );

// ==========================================================
// Update Product
// ==========================================================

export const updateProductThunk =
  createAsyncThunk(
    "admin/updateProduct",
    async (
      {
        productId,
        productData,
      },
      thunkAPI
    ) => {
      try {
        return await updateAdminProduct({
          productId,
          productData,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to update product."
        );
      }
    }
  );

// ==========================================================
// Orders
// ==========================================================

export const fetchOrdersThunk =
  createAsyncThunk(
    "admin/orders",
    async (
      params = {},
      thunkAPI
    ) => {
      try {
        return await getAdminOrders(
          params
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load orders."
        );
      }
    }
  );

export const fetchOrderThunk =
  createAsyncThunk(
    "admin/order",
    async (
      orderId,
      thunkAPI
    ) => {
      try {
        return await getAdminOrder(
          orderId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load order."
        );
      }
    }
  );

export const updateOrderStatusThunk =
  createAsyncThunk(
    "admin/updateOrderStatus",
    async (
      {
        orderId,
        status,
      },
      thunkAPI
    ) => {
      try {
        return await updateAdminOrderStatus(
          {
            orderId,
            status,
          }
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to update order."
        );
      }
    }
  );


// ==========================================================
// Update Payment Status
// ==========================================================

export const updatePaymentStatusThunk =
  createAsyncThunk(
    "admin/updatePaymentStatus",

    async (
      {
        orderId,
        paymentStatus,
      },
      thunkAPI
    ) => {
      try {

        return await updateAdminPaymentStatus(
          {
            orderId,
            paymentStatus,
          }
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to update payment status."
        );

      }
    }
  );


// ==========================================================
// Customers
// ==========================================================

export const fetchCustomersThunk =
  createAsyncThunk(
    "admin/customers",
    async (_, thunkAPI) => {
      try {
        return await getAdminCustomers();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load customers."
        );
      }
    }
  );

export const fetchCustomerThunk =
  createAsyncThunk(
    "admin/customer",
    async (
      userId,
      thunkAPI
    ) => {
      try {
        return await getAdminCustomer(
          userId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load customer."
        );
      }
    }
  );

export const updateCustomerThunk =
  createAsyncThunk(
    "admin/updateCustomer",
    async (
      payload,
      thunkAPI
    ) => {
      try {
        return await updateAdminCustomer(
          payload
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to update customer."
        );
      }
    }
  );

export const activateCustomerThunk =
  createAsyncThunk(
    "admin/activateCustomer",
    async (
      userId,
      thunkAPI
    ) => {
      try {
        return await activateCustomer(
          userId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to activate customer."
        );
      }
    }
  );

export const deactivateCustomerThunk =
  createAsyncThunk(
    "admin/deactivateCustomer",
    async (
      userId,
      thunkAPI
    ) => {
      try {
        return await deactivateCustomer(
          userId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to deactivate customer."
        );
      }
    }
  );

export const verifyCustomerThunk =
  createAsyncThunk(
    "admin/verifyCustomer",
    async (
      userId,
      thunkAPI
    ) => {
      try {
        return await verifyCustomer(
          userId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to verify customer."
        );
      }
    }
  );

// ==========================================================
// Reviews
// ==========================================================

export const fetchReviewsThunk =
  createAsyncThunk(
    "admin/reviews",
    async (_, thunkAPI) => {
      try {
        return await getAdminReviews();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load reviews."
        );
      }
    }
  );

export const fetchReviewThunk =
  createAsyncThunk(
    "admin/review",
    async (
      reviewId,
      thunkAPI
    ) => {
      try {
        return await getAdminReview(
          reviewId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load review."
        );
      }
    }
  );

export const replyReviewThunk =
  createAsyncThunk(
    "admin/replyReview",
    async (
      payload,
      thunkAPI
    ) => {
      try {
        return await replyReview(
          payload
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to reply to review."
        );
      }
    }
  );

export const hideReviewThunk =
  createAsyncThunk(
    "admin/hideReview",
    async (
      reviewId,
      thunkAPI
    ) => {
      try {
        return await hideReview(
          reviewId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to hide review."
        );
      }
    }
  );

export const showReviewThunk =
  createAsyncThunk(
    "admin/showReview",
    async (
      reviewId,
      thunkAPI
    ) => {
      try {
        return await showReview(
          reviewId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to show review."
        );
      }
    }
  );

export const deleteReviewThunk =
  createAsyncThunk(
    "admin/deleteReview",
    async (
      reviewId,
      thunkAPI
    ) => {
      try {
        await deleteReview(
          reviewId
        );

        return reviewId;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to delete review."
        );
      }
    }
  );

// ==========================================================
// Analytics
// ==========================================================

export const fetchAnalyticsThunk =
  createAsyncThunk(
    "admin/analytics",
    async (_, thunkAPI) => {
      try {
        return await getAnalyticsDashboard();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.detail ||
            "Unable to load analytics."
        );
      }
    }
  );