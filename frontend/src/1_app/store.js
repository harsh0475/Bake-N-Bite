import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../4_features/auth/slice/authSlice";
import categoryReducer from "../4_features/categories/slice/categorySlice";
import productReducer from "../4_features/products/slice/productSlice";
import cartReducer from "../4_features/cart/slice/cartSlice";
import addressReducer from "../4_features/profile/slice/addressSlice";
import checkoutReducer from "../4_features/checkout/slice/checkoutSlice";
import orderReducer from "../4_features/orders/slice/orderSlice";
import adminReducer from "../4_features/admin/slice/adminSlice";
import paymentReducer from "../4_features/payment/slice/paymentSlice";
import reviewReducer from "../4_features/reviews/slice/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    address: addressReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    payment: paymentReducer, 
    admin: adminReducer,
    reviews: reviewReducer,
  },

  devTools: import.meta.env.DEV,
});

export default store;