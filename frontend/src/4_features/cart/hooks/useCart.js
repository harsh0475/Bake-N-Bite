import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCartThunk,
  addToCartThunk,
  updateCartThunk,
  removeCartThunk,
  clearCartThunk,
} from "../thunk/cartThunk";

const useCart = () => {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);

  const fetchCart = useCallback(() => {
    return dispatch(fetchCartThunk()).unwrap();
  }, [dispatch]);

  const addItem = useCallback((data) => {
    return dispatch(addToCartThunk(data)).unwrap();
  }, [dispatch]);

  const updateItem = useCallback((id, quantity) => {
    return dispatch(
      updateCartThunk({
        id,
        data: { quantity },
      })
    ).unwrap();
  }, [dispatch]);

  const removeItem = useCallback((id) => {
    console.log("Dispatch remove:", id);
    return dispatch(removeCartThunk(id)).unwrap();
  }, [dispatch]);

  const clear = useCallback(() => {
    return dispatch(clearCartThunk()).unwrap();
  }, [dispatch]);

  return {
    ...cartState,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clear,
  };
};

export default useCart;