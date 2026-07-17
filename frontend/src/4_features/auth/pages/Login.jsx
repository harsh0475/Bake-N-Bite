// src/4_features/auth/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

import AuthInput from "../components/AuthInput";
import AuthDivider from "../components/AuthDivider";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Button from "../../../3_components/common/Button";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login, loading, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-orange-100 bg-white p-6 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900">Welcome Back</h1>

        <p className="mt-2 text-gray-500">
          Login to order your favourite homemade food.
        </p>
      </div>

      <div className="mb-6">
        <GoogleSignInButton />
      </div>

      <AuthDivider label="OR LOGIN WITH EMAIL" />

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <div className="space-y-2">
          <AuthInput
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={!loading && <LogIn size={18} />}
        >
          {loading ? "Please wait..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-orange-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;