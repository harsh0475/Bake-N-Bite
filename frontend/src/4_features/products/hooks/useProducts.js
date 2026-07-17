import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductsThunk,
  fetchProductThunk,
  fetchProductsByCategoryThunk,
} from "../thunk/productThunk";

const useProducts = () => {
  const dispatch = useDispatch();

  const productState = useSelector(
    (state) => state.products
  );

  const fetchProducts = useCallback(
    (filters = {}) => {
      dispatch(
        fetchProductsThunk(filters)
      );
    },
    [dispatch]
  );

  const fetchProduct = useCallback(
    (id) => {
      dispatch(fetchProductThunk(id));
    },
    [dispatch]
  );

  const fetchProductsByCategory = useCallback(
    (id) => {
      dispatch(fetchProductsByCategoryThunk(id));
    },
    [dispatch]
  );

  return {
    ...productState,

    fetchProducts,

    fetchProduct,

    fetchProductsByCategory,
  };
};

export default useProducts;