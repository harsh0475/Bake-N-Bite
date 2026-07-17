import api from "../../../1_app/axios";

// ==========================================================
// Dashboard
// ==========================================================

export const getDashboardStats = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

// ==========================================================
// Products
// ==========================================================

export const getAdminProducts = async (
  params = {}
) => {
  const response = await api.get(
    "/products/admin",
    {
      params,
    }
  );

  return response.data;
};

export const getAdminProduct = async (
  productId
) => {
  const response = await api.get(
    `/products/${productId}`
  );

  return response.data;
};

export const createAdminProduct = async (
  productData
) => {
  const response = await api.post(
    "/products",
    productData
  );

  return response.data;
};

export const updateAdminProduct = async ({
  productId,
  productData,
}) => {
  const response = await api.put(
    `/products/${productId}`,
    productData
  );

  return response.data;
};

export const deleteAdminProduct = async (
  productId
) => {
  const response = await api.delete(
    `/products/${productId}`
  );

  return response.data;
};

// ==========================================================
// Orders
// ==========================================================

export const getAdminOrders = async (
  params = {}
) => {
  const response = await api.get(
    "/admin/orders",
    {
      params,
    }
  );

  return response.data;
};

export const getAdminOrder = async (
  orderId
) => {
  const response = await api.get(
    `/admin/orders/${orderId}`
  );

  return response.data;
};

export const updateAdminOrderStatus =
  async ({
    orderId,
    status,
  }) => {
    const response =
      await api.patch(
        `/admin/orders/${orderId}/status`,
        {
          status,
        }
      );

    return response.data;
  };


// ==========================================================
// Update Payment Status (Cash On Delivery)
// ==========================================================

export const updateAdminPaymentStatus =
  async ({
    orderId,
    paymentStatus,
  }) => {
    const response =
      await api.patch(
        `/admin/orders/${orderId}/payment-status`,
        {
          payment_status:
            paymentStatus,
        }
      );

    return response.data;
  };


// ==========================================================
// Customers
// ==========================================================

export const getAdminCustomers = async () => {
  const response = await api.get(
    "/admin/users"
  );

  return response.data;
};

export const getAdminCustomer = async (
  userId
) => {
  const response = await api.get(
    `/admin/users/${userId}`
  );

  return response.data;
};

export const updateAdminCustomer = async ({
  userId,
  userData,
}) => {
  const response = await api.patch(
    `/admin/users/${userId}`,
    userData
  );

  return response.data;
};

export const activateCustomer =
  async (userId) => {
    const response =
      await api.patch(
        `/admin/users/${userId}/activate`
      );

    return response.data;
  };

export const deactivateCustomer =
  async (userId) => {
    const response =
      await api.patch(
        `/admin/users/${userId}/deactivate`
      );

    return response.data;
  };

export const verifyCustomer =
  async (userId) => {
    const response =
      await api.patch(
        `/admin/users/${userId}/verify`
      );

    return response.data;
  };

  
// ==========================================================
// Reviews
// ==========================================================

export const getAdminReviews = async () => {
  const response = await api.get(
    "/admin/reviews"
  );

  return response.data;
};

export const getAdminReview = async (
  reviewId
) => {
  const response = await api.get(
    `/admin/reviews/${reviewId}`
  );

  return response.data;
};

export const replyReview = async ({
  reviewId,
  adminReply,
}) => {
  const response = await api.patch(
    `/admin/reviews/${reviewId}/reply`,
    {
      admin_reply: adminReply,
    }
  );

  return response.data;
};

export const hideReview = async (
  reviewId
) => {
  const response =
    await api.patch(
      `/admin/reviews/${reviewId}/hide`
    );

  return response.data;
};

export const showReview = async (
  reviewId
) => {
  const response =
    await api.patch(
      `/admin/reviews/${reviewId}/show`
    );

  return response.data;
};

export const deleteReview = async (
  reviewId
) => {
  const response =
    await api.delete(
      `/admin/reviews/${reviewId}`
    );

  return response.data;
};

// ==========================================================
// Analytics
// ==========================================================

export const getAnalyticsDashboard = async () => {
  const response = await api.get(
    "/admin/analytics/dashboard"
  );

  return response.data;
};

// ==========================================================
// Product Images
// ==========================================================

export const uploadProductImage = async (
  productId,
  image
) => {
  const formData = new FormData();

  formData.append(
    "image",
    image
  );

  const response = await api.post(
    `/product-images/${productId}`,
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

export const uploadMultipleProductImages =
  async (
    productId,
    images
  ) => {
    const formData =
      new FormData();

    images.forEach((image) => {
      formData.append(
        "images",
        image
      );
    });

    const response =
      await api.post(
        `/product-images/${productId}/multiple`,
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

export const getProductImages =
  async (productId) => {
    const response =
      await api.get(
        `/product-images/${productId}`
      );

    return response.data;
  };

export const deleteProductImage =
  async (imageId) => {
    const response =
      await api.delete(
        `/product-images/image/${imageId}`
      );

    return response.data;
  };

export const setPrimaryProductImage =
  async (imageId) => {
    const response =
      await api.patch(
        `/product-images/image/${imageId}/primary`
      );

    return response.data;
  };