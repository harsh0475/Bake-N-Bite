import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserThunk } from "../4_features/auth/thunk/authThunk";
import { fetchCartThunk } from "../4_features/cart/thunk/cartThunk";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const cartInitialized = useRef(false);

  const token = useSelector(
    (state) => state.auth.token
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  // ======================================================
  // Load Current User
  // ======================================================

  useEffect(() => {
    if (!token) return;
      cartInitialized.current = false;

    dispatch(getCurrentUserThunk());
  }, [dispatch, token]);

  // ======================================================
  // Load Cart Once After Login
  // ======================================================

  useEffect(() => {
    if (!user) return;

    if (cartInitialized.current) return;

    cartInitialized.current = true;

    dispatch(fetchCartThunk());
  }, [dispatch, user]);

  return children;
};

export default AppInitializer;