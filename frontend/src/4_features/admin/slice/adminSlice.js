import { createSlice } from "@reduxjs/toolkit";

import {
  // Dashboard
  fetchDashboardThunk,

  // Products
  fetchProductsThunk,
  fetchProductThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,

  // Orders
  fetchOrdersThunk,
  fetchOrderThunk,
  updateOrderStatusThunk,
  updatePaymentStatusThunk,

  // Customers
  fetchCustomersThunk,
  fetchCustomerThunk,
  updateCustomerThunk,
  activateCustomerThunk,
  deactivateCustomerThunk,
  verifyCustomerThunk,

  // Reviews
  fetchReviewsThunk,
  fetchReviewThunk,
  replyReviewThunk,
  hideReviewThunk,
  showReviewThunk,
  deleteReviewThunk,

  // Analytics
  fetchAnalyticsThunk,
} from "../thunk/adminThunk";

const initialState = {
  // Dashboard

  dashboard: null,

  // Products

  products: [],

  selectedProduct: null,

  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  },

  // Orders

  orders: [],
  selectedOrder: null,

  // Customers

  customers: [],
  selectedCustomer: null,

  // Reviews

  reviews: [],
  selectedReview: null,

  // Analytics
  analytics: null,
  // Loading

  loading: {
    dashboard: false,

    products: false,
    product: false,
    createProduct: false,
    updateProduct: false,
    deleteProduct: false,

    orders: false,
    order: false,
    updateOrderStatus: false,
    updatePaymentStatus: false,

    customers: false,
    customer: false,
    updateCustomer: false,
    activateCustomer: false,
    deactivateCustomer: false,
    verifyCustomer: false,

    reviews: false,
    review: false,
    replyReview: false,
    hideReview: false,
    showReview: false,
    deleteReview: false,

    analytics: false,
  },

  // Errors

  error: {
    dashboard: null,

    products: null,
    product: null,
    createProduct: null,
    updateProduct: null,
    deleteProduct: null,

    orders: null,
    order: null,
    updateOrderStatus: null,
    updatePaymentStatus: null,

    customers: null,
    customer: null,
    updateCustomer: null,
    activateCustomer: null,
    deactivateCustomer: null,
    verifyCustomer: null,

    reviews: null,
    review: null,
    replyReview: null,
    hideReview: null,
    showReview: null,
    deleteReview: null,

    analytics: null,
  },
};

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =====================================================
      // Dashboard
      // =====================================================

      .addCase(
        fetchDashboardThunk.pending,
        (state) => {
          state.loading.dashboard = true;
          state.error.dashboard = null;
        }
      )

      .addCase(
        fetchDashboardThunk.fulfilled,
        (state, action) => {
          state.loading.dashboard = false;
          state.dashboard = action.payload;
        }
      )

      .addCase(
        fetchDashboardThunk.rejected,
        (state, action) => {
          state.loading.dashboard = false;
          state.error.dashboard = action.payload;
        }
      )

      // =====================================================
      // Products
      // =====================================================

      .addCase(
        fetchProductsThunk.pending,
        (state) => {
          state.loading.products = true;
          state.error.products = null;
        }
      )

      .addCase(
        fetchProductsThunk.fulfilled,
        (state, action) => {
          state.loading.products = false;

          state.products = action.payload.items;

          state.pagination.page = action.payload.page;
          state.pagination.pageSize = action.payload.page_size;
          state.pagination.total = action.payload.total;
          state.pagination.totalPages =
            action.payload.total_pages;
        }
      )

      .addCase(
        fetchProductsThunk.rejected,
        (state, action) => {
          state.loading.products = false;
          state.error.products = action.payload;
        }
      )

      // =====================================================
      // Single Product
      // =====================================================

      .addCase(
        fetchProductThunk.pending,
        (state) => {
          state.loading.product = true;
          state.error.product = null;
        }
      )

      .addCase(
        fetchProductThunk.fulfilled,
        (state, action) => {
          state.loading.product = false;
          state.selectedProduct = action.payload;
        }
      )

      .addCase(
        fetchProductThunk.rejected,
        (state, action) => {
          state.loading.product = false;
          state.error.product = action.payload;
        }
      )

      .addCase(
        createProductThunk.pending,
        (state) => {
          state.loading.createProduct = true;
        }
      )

      .addCase(
        createProductThunk.fulfilled,
        (state) => {
          state.loading.createProduct = false;
        }
      )

      .addCase(
        createProductThunk.rejected,
        (state, action) => {
          state.loading.createProduct = false;
          state.error.createProduct = action.payload;
        }
      )

      .addCase(
        updateProductThunk.pending,
        (state) => {
          state.loading.updateProduct = true;
        }
      )

      .addCase(
        updateProductThunk.fulfilled,
        (state) => {
          state.loading.updateProduct = false;
        }
      )

      .addCase(
        updateProductThunk.rejected,
        (state, action) => {
          state.loading.updateProduct = false;
          state.error.updateProduct = action.payload;
        }
      )

      .addCase(
        deleteProductThunk.pending,
        (state) => {
          state.loading.deleteProduct = true;
        }
      )

      .addCase(
          deleteProductThunk.fulfilled,
          (state, action) => {
              state.loading.deleteProduct = false;

              state.products = state.products.filter(
                  product => product.id !== action.payload
              );

              if (
                  state.selectedProduct?.id === action.payload
              ) {
                  state.selectedProduct = null;
              }
          }
      )

      .addCase(
        deleteProductThunk.rejected,
        (state, action) => {
          state.loading.deleteProduct = false;
          state.error.deleteProduct = action.payload;
        }
      )

      // =====================================================
      // Orders
      // =====================================================

      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading.orders = true;
        state.error.orders = null;
      })

      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading.orders = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading.orders = false;
        state.error.orders = action.payload;
      })

      .addCase(fetchOrderThunk.pending, (state) => {
        state.loading.order = true;
        state.error.order = null;
      })

      .addCase(fetchOrderThunk.fulfilled, (state, action) => {
        state.loading.order = false;
        state.selectedOrder = action.payload;
      })

      .addCase(fetchOrderThunk.rejected, (state, action) => {
        state.loading.order = false;
        state.error.order = action.payload;
      })

      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading.updateOrderStatus = true;
        state.error.updateOrderStatus = null;
      })

      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading.updateOrderStatus = false;
        state.selectedOrder = action.payload;
      })

      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading.updateOrderStatus = false;
        state.error.updateOrderStatus = action.payload;
      })

      // =====================================================
      // Update Payment Status
      // =====================================================

      .addCase(
          updatePaymentStatusThunk.pending,
          (state) => {
              state.loading.updatePaymentStatus = true;
              state.error.updatePaymentStatus = null;
          }
      )

      .addCase(
          updatePaymentStatusThunk.fulfilled,
          (state, action) => {
              state.loading.updatePaymentStatus = false;
              state.selectedOrder = action.payload;
          }
      )

      .addCase(
          updatePaymentStatusThunk.rejected,
          (state, action) => {
              state.loading.updatePaymentStatus = false;

              state.error.updatePaymentStatus =
                  action.payload;
          }
      )

      // =====================================================
      // Customers
      // =====================================================

      .addCase(fetchCustomersThunk.pending, (state) => {
        state.loading.customers = true;
        state.error.customers = null;
      })

      .addCase(fetchCustomersThunk.fulfilled, (state, action) => {
        state.loading.customers = false;
        state.customers = action.payload;
      })

      .addCase(fetchCustomersThunk.rejected, (state, action) => {
        state.loading.customers = false;
        state.error.customers = action.payload;
      })

      .addCase(fetchCustomerThunk.pending, (state) => {
        state.loading.customer = true;
      })

      .addCase(fetchCustomerThunk.fulfilled, (state, action) => {
        state.loading.customer = false;
        state.selectedCustomer = action.payload;
      })

      .addCase(fetchCustomerThunk.rejected, (state, action) => {
        state.loading.customer = false;
        state.error.customer = action.payload;
      })

      .addCase(updateCustomerThunk.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
      })

      .addCase(activateCustomerThunk.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
      })

      .addCase(deactivateCustomerThunk.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
      })

      .addCase(verifyCustomerThunk.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload;
      })

      // =====================================================
      // Reviews
      // =====================================================

      .addCase(fetchReviewsThunk.pending, (state) => {
        state.loading.reviews = true;
        state.error.reviews = null;
      })

      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.loading.reviews = false;
        state.reviews = action.payload;
      })

      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.loading.reviews = false;
        state.error.reviews = action.payload;
      })

      .addCase(fetchReviewThunk.pending, (state) => {
        state.loading.review = true;
      })

      .addCase(fetchReviewThunk.fulfilled, (state, action) => {
        state.loading.review = false;
        state.selectedReview = action.payload;
      })

      .addCase(fetchReviewThunk.rejected, (state, action) => {
        state.loading.review = false;
        state.error.review = action.payload;
      })

      .addCase(replyReviewThunk.pending, (state) => {
        state.loading.replyReview = true;
      })

      .addCase(replyReviewThunk.fulfilled, (state, action) => {
        state.loading.replyReview = false;
        state.selectedReview = action.payload;
      })

      .addCase(replyReviewThunk.rejected, (state, action) => {
        state.loading.replyReview = false;
        state.error.replyReview = action.payload;
      })

      .addCase(hideReviewThunk.fulfilled, (state, action) => {
        state.selectedReview = action.payload;
      })

      .addCase(showReviewThunk.fulfilled, (state, action) => {
        state.selectedReview = action.payload;
      })

      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })

      // =====================================================
      // Analytics
      // =====================================================

      .addCase(
        fetchAnalyticsThunk.pending,
        (state) => {
          state.loading.analytics = true;
          state.error.analytics = null;
        }
      )

      .addCase(
        fetchAnalyticsThunk.fulfilled,
        (state, action) => {
          state.loading.analytics = false;
          state.analytics =
            action.payload;
        }
      )

      .addCase(
        fetchAnalyticsThunk.rejected,
        (state, action) => {
          state.loading.analytics = false;
          state.error.analytics =
            action.payload;
        }
      );

    },
});

export default adminSlice.reducer;