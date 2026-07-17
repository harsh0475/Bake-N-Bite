import { useCallback } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createRazorpayOrderThunk,
  verifyPaymentThunk,
  retryPaymentThunk,
  fetchPaymentThunk,
  changePaymentMethodThunk,
} from "../thunk/paymentThunk";

import {
  clearPaymentState,
} from "../slice/paymentSlice";

const usePayment = () => {

  const dispatch = useDispatch();

  const payment = useSelector(
    (state) => state.payment
  );

  // =====================================================
  // Create Razorpay Order
  // =====================================================

  const createRazorpayOrder =
    useCallback(
      (orderId) =>
        dispatch(
          createRazorpayOrderThunk(orderId)
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Verify Payment
  // =====================================================

  const verifyPayment =
    useCallback(
      (data) =>
        dispatch(
          verifyPaymentThunk(data)
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Retry Payment
  // =====================================================

  const retryPayment =
    useCallback(
      (orderId) =>
        dispatch(
          retryPaymentThunk(orderId)
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Fetch Payment
  // =====================================================

  const fetchPayment =
    useCallback(
      (orderId) =>
        dispatch(
          fetchPaymentThunk(orderId)
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Change Payment Method
  // =====================================================

  const changePaymentMethod =
    useCallback(
      (
        orderId,
        paymentMethod
      ) =>
        dispatch(
          changePaymentMethodThunk({
            orderId,
            paymentMethod,
          })
        ).unwrap(),
      [dispatch]
    );

  // =====================================================
  // Clear Payment State
  // =====================================================

  const clear =
    useCallback(
      () =>
        dispatch(
          clearPaymentState()
        ),
      [dispatch]
    );

  return {

    ...payment,

    createRazorpayOrder,

    verifyPayment,

    retryPayment,

    fetchPayment,

    changePaymentMethod,

    clear,

  };

};

export default usePayment;