import { useCallback } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  checkoutThunk,
} from "../thunk/checkoutThunk";

const useCheckout = () => {

  const dispatch =
    useDispatch();

  const checkoutState =
    useSelector(
      (state) => state.checkout
    );

  // ======================================================
  // Place Order
  // ======================================================

  const placeOrder =
    useCallback(
      (data) => {

        return dispatch(
          checkoutThunk(data)
        ).unwrap();

      },
      [dispatch]
    );

  return {

    ...checkoutState,

    placeOrder,

  };

};

export default useCheckout;