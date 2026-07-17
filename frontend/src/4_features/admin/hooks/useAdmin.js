import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDashboardThunk,

  fetchProductsThunk,
  fetchProductThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,

  fetchOrdersThunk,
  fetchOrderThunk,
  updateOrderStatusThunk,
  updatePaymentStatusThunk,

  fetchCustomersThunk,
  fetchCustomerThunk,
  updateCustomerThunk,
  activateCustomerThunk,
  deactivateCustomerThunk,
  verifyCustomerThunk,

  fetchReviewsThunk,
  fetchReviewThunk,
  replyReviewThunk,
  hideReviewThunk,
  showReviewThunk,
  deleteReviewThunk,

  fetchAnalyticsThunk,
} from "../thunk/adminThunk";

const useAdmin = () => {
  const dispatch = useDispatch();

  const admin = useSelector(
    (state) => state.admin
  );

  const fetchDashboard = useCallback(
    () => dispatch(fetchDashboardThunk()).unwrap(),
    [dispatch]
  );

  const fetchProducts = useCallback(
    (params) =>
      dispatch(fetchProductsThunk(params)).unwrap(),
    [dispatch]
  );

  const fetchProduct = useCallback(
    (productId) =>
      dispatch(fetchProductThunk(productId)).unwrap(),
    [dispatch]
  );

  const createProduct = useCallback(
    (data) =>
      dispatch(createProductThunk(data)).unwrap(),
    [dispatch]
  );

  const updateProduct = useCallback(
    (payload) =>
      dispatch(updateProductThunk(payload)).unwrap(),
    [dispatch]
  );

  const deleteProduct = useCallback(
    (id) =>
      dispatch(deleteProductThunk(id)).unwrap(),
    [dispatch]
  );

  const fetchOrders = useCallback(
    (params) =>
      dispatch(fetchOrdersThunk(params)).unwrap(),
    [dispatch]
  );

  const fetchOrder = useCallback(
    (id) =>
      dispatch(fetchOrderThunk(id)).unwrap(),
    [dispatch]
  );

  const updateOrderStatus = useCallback(
    (orderId, status) =>
      dispatch(
        updateOrderStatusThunk({
          orderId,
          status,
        })
      ).unwrap(),
    [dispatch]
  );

  const updatePaymentStatus =
  useCallback(
    (
      orderId,
      paymentStatus
    ) =>
      dispatch(
        updatePaymentStatusThunk({
          orderId,
          paymentStatus,
        })
      ).unwrap(),
    [dispatch]
  );

  const fetchCustomers = useCallback(
    () =>
      dispatch(fetchCustomersThunk()).unwrap(),
    [dispatch]
  );

  const fetchCustomer = useCallback(
    (id) =>
      dispatch(fetchCustomerThunk(id)).unwrap(),
    [dispatch]
  );

  const updateCustomer = useCallback(
    (userId, userData) =>
      dispatch(
        updateCustomerThunk({
          userId,
          userData,
        })
      ).unwrap(),
    [dispatch]
  );

  const activateCustomer = useCallback(
    (id) =>
      dispatch(
        activateCustomerThunk(id)
      ).unwrap(),
    [dispatch]
  );

  const deactivateCustomer = useCallback(
    (id) =>
      dispatch(
        deactivateCustomerThunk(id)
      ).unwrap(),
    [dispatch]
  );

  const verifyCustomer = useCallback(
    (id) =>
      dispatch(
        verifyCustomerThunk(id)
      ).unwrap(),
    [dispatch]
  );

  const fetchReviews = useCallback(
    () =>
      dispatch(fetchReviewsThunk()).unwrap(),
    [dispatch]
  );

  const fetchReview = useCallback(
    (id) =>
      dispatch(fetchReviewThunk(id)).unwrap(),
    [dispatch]
  );

  const replyReview = useCallback(
    (reviewId, adminReply) =>
      dispatch(
        replyReviewThunk({
          reviewId,
          adminReply,
        })
      ).unwrap(),
    [dispatch]
  );

  const hideReview = useCallback(
    (id) =>
      dispatch(hideReviewThunk(id)).unwrap(),
    [dispatch]
  );

  const showReview = useCallback(
    (id) =>
      dispatch(showReviewThunk(id)).unwrap(),
    [dispatch]
  );

  const deleteReview = useCallback(
    (id) =>
      dispatch(deleteReviewThunk(id)).unwrap(),
    [dispatch]
  );

  const fetchAnalytics = useCallback(
    () =>
      dispatch(fetchAnalyticsThunk()).unwrap(),
    [dispatch]
  );

  return {
    ...admin,

    fetchDashboard,

    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    fetchOrders,
    fetchOrder,
    updateOrderStatus,
    updatePaymentStatus,

    fetchCustomers,
    fetchCustomer,
    updateCustomer,
    activateCustomer,
    deactivateCustomer,
    verifyCustomer,

    fetchReviews,
    fetchReview,
    replyReview,
    hideReview,
    showReview,
    deleteReview,

    fetchAnalytics,
  };
};

export default useAdmin;