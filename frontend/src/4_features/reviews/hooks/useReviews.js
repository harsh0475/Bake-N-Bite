import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyReviewsThunk,
  createReviewThunk,
  updateReviewThunk,
} from "../thunk/reviewThunk";

const useReviews = () => {
  const dispatch = useDispatch();

  const reviewState = useSelector((state) => state.reviews);

  const fetchMyReviews = useCallback(() => {
    return dispatch(fetchMyReviewsThunk()).unwrap();
  }, [dispatch]);

  const createReview = useCallback((data) => {
    return dispatch(createReviewThunk(data)).unwrap();
  }, [dispatch]);

  const updateReview = useCallback((id, data) => {
    return dispatch(updateReviewThunk({ id, data })).unwrap();
  }, [dispatch]);

  return {
    ...reviewState,
    fetchMyReviews,
    createReview,
    updateReview,
  };
};

export default useReviews;