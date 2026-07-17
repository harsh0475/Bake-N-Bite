import api from "../../../1_app/axios";

// ==========================================================
// Get Categories
// ==========================================================

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

// ==========================================================
// Get Category
// ==========================================================

export const getCategory = async (id) => {
  const response = await api.get(
    `/categories/${id}`
  );

  return response.data;
};

// ==========================================================
// Create Category
// ==========================================================

export const createCategory = async (
  data
) => {
  const response = await api.post(
    "/categories",
    data
  );

  return response.data;
};

// ==========================================================
// Update Category
// ==========================================================

export const updateCategory = async (
  id,
  data
) => {
  const response = await api.put(
    `/categories/${id}`,
    data
  );

  return response.data;
};

// ==========================================================
// Delete Category
// ==========================================================

export const deleteCategory = async (
  id
) => {
  const response = await api.delete(
    `/categories/${id}`
  );

  return response.data;
};

// ==========================================================
// Upload Category Image
// ==========================================================

export const uploadCategoryImage =
  async (
    categoryId,
    file
  ) => {
    const formData = new FormData();

    formData.append(
      "image",
      file
    );

    const response = await api.post(
      `/categories/${categoryId}/image`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

// ==========================================================
// Delete Category Image
// ==========================================================

export const deleteCategoryImage =
  async (categoryId) => {
    const response =
      await api.delete(
        `/categories/${categoryId}/image`
      );

    return response.data;
  };