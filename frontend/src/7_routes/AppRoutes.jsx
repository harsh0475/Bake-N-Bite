import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../5_layouts/MainLayout";
import AuthLayout from "../5_layouts/AuthLayout";
import AdminLayout from "../4_features/admin/components/AdminLayout";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Public Pages
import Home from "../6_pages/Home";
import About from "../6_pages/About";
import Contact from "../6_pages/Contact";
import NotFound from "../6_pages/NotFound";

// Auth
import Login from "../4_features/auth/pages/Login";
import Register from "../4_features/auth/pages/Register";
import ForgotPassword from "../4_features/auth/pages/ForgotPassword";
import ResetPassword from "../4_features/auth/pages/ResetPassword";


// Customer
import Products from "../4_features/products/pages/Products";
import ProductDetails from "../4_features/products/pages/ProductDetails";
import CartPage from "../4_features/cart/pages/CartPage";
import Checkout from "../4_features/checkout/pages/Checkout";
import Profile from "../4_features/profile/pages/Profile";
import ChangePassword from "../4_features/profile/pages/ChangePassword";
import Addresses from "../4_features/profile/pages/Addresses";
import MyOrders from "../4_features/orders/pages/MyOrders";
import CustomerOrderDetails from "../4_features/orders/pages/OrderDetails";
import Categories from "../4_features/categories/pages/Categories";

// Admin
import Dashboard from "../4_features/admin/pages/Dashboard";
import AdminProducts from "../4_features/admin/pages/Products";
import AddProduct from "../4_features/admin/pages/AddProduct";
import EditProduct from "../4_features/admin/pages/EditProduct";

import Category from "../4_features/admin/pages/Category";
import AddCategory from "../4_features/admin/pages/AddCategory";
import EditCategory from "../4_features/admin/pages/EditCategory";

import Orders from "../4_features/admin/pages/Orders";
import AdminOrderDetails from "../4_features/admin/pages/OrderDetails";

import Customers from "../4_features/admin/pages/Customers";
import CustomerDetails from "../4_features/admin/pages/CustomerDetails";

import Reviews from "../4_features/admin/pages/Reviews";
import ReviewDetails from "../4_features/admin/pages/ReviewDetails";

import Analytics from "../4_features/admin/pages/Analytics";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ========================= */}
      {/* Main Layout */}
      {/* ========================= */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <CustomerOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>

      {/* ========================= */}
      {/* Authentication */}
      {/* ========================= */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

      </Route>

      {/* ========================= */}
      {/* Admin */}
      {/* ========================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="products"
          element={<AdminProducts />}
        />

        <Route
          path="products/new"
          element={<AddProduct />}
        />

        <Route
          path="products/:productId/edit"
          element={<EditProduct />}
        />

        <Route
          path="categories"
          element={<Category />}
        />

        <Route
          path="categories/new"
          element={<AddCategory />}
        />

        <Route
          path="categories/:categoryId/edit"
          element={<EditCategory />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="orders/:orderId"
          element={<AdminOrderDetails />}
        />

        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="customers/:customerId"
          element={<CustomerDetails />}
        />

        <Route
          path="reviews"
          element={<Reviews />}
        />

        <Route
          path="reviews/:reviewId"
          element={<ReviewDetails />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />

      </Route>

      {/* ========================= */}
      {/* 404 */}
      {/* ========================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;