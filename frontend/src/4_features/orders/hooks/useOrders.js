import { useCallback } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchOrderThunk,
  fetchMyOrdersThunk,
} from "../thunk/orderThunk";

import {
  clearSelectedOrder,
  clearOrderError,
  resetOrders,
} from "../slice/orderSlice";

const useOrders = () => {

  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.orders
  );

  // =====================================================
  // Fetch All Orders
  // =====================================================

  const fetchOrders =
    useCallback(
      () =>
        dispatch(
          fetchMyOrdersThunk()
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Fetch Single Order
  // =====================================================

  const fetchOrder =
    useCallback(
      (orderId) =>
        dispatch(
          fetchOrderThunk(orderId)
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Clear Selected Order
  // =====================================================

  const clearOrder =
    useCallback(
      () =>
        dispatch(
          clearSelectedOrder()
        ),
      [dispatch]
    );

  // =====================================================
  // Clear Error
  // =====================================================

  const clearError =
    useCallback(
      () =>
        dispatch(
          clearOrderError()
        ),
      [dispatch]
    );

  // =====================================================
  // Reset Orders
  // =====================================================

  const reset =
    useCallback(
      () =>
        dispatch(
          resetOrders()
        ),
      [dispatch]
    );

  return {

    ...orders,

    fetchOrders,

    fetchOrder,

    clearOrder,

    clearError,

    reset,

  };

};

export default useOrders;