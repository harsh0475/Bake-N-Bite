import {
  useCallback,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchCategoriesThunk,
  fetchCategoryThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
  uploadCategoryImageThunk,
  deleteCategoryImageThunk,
} from "../thunk/categoryThunk";

const useCategories = () => {
  const dispatch = useDispatch();

  const categoryState = useSelector(
    (state) => state.categories
  );

  // ======================================================
  // Fetch Categories
  // ======================================================

  const fetchCategories = useCallback(() => {
    return dispatch(
      fetchCategoriesThunk()
    ).unwrap();
  }, [dispatch]);

  // ======================================================
  // Fetch Category
  // ======================================================

  const fetchCategory = useCallback(
    (id) => {
      return dispatch(
        fetchCategoryThunk(id)
      ).unwrap();
    },
    [dispatch]
  );

  // ======================================================
  // Create Category
  // ======================================================

  const createCategory = useCallback(
    (data) => {
      return dispatch(
        createCategoryThunk(data)
      ).unwrap();
    },
    [dispatch]
  );

  // ======================================================
  // Update Category
  // ======================================================

  const updateCategory = useCallback(
    (id, data) => {
      return dispatch(
        updateCategoryThunk({
          id,
          data,
        })
      ).unwrap();
    },
    [dispatch]
  );

  // ======================================================
  // Delete Category
  // ======================================================

  const deleteCategory = useCallback(
    (id) => {
      return dispatch(
        deleteCategoryThunk(id)
      ).unwrap();
    },
    [dispatch]
  );

  // ======================================================
  // Upload Category Image
  // ======================================================

  const uploadImage = useCallback(
    (categoryId, file) => {
      return dispatch(
        uploadCategoryImageThunk({
          categoryId,
          file,
        })
      ).unwrap();
    },
    [dispatch]
  );

  // ======================================================
  // Delete Category Image
  // ======================================================

  const deleteImage = useCallback(
    (categoryId) => {
      return dispatch(
        deleteCategoryImageThunk(
          categoryId
        )
      ).unwrap();
    },
    [dispatch]
  );

  return {
    ...categoryState,

    fetchCategories,

    fetchCategory,

    createCategory,

    updateCategory,

    deleteCategory,

    uploadImage,

    deleteImage,
  };
};

export default useCategories;