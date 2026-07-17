// src/4_features/auth/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, UserPlus } from "lucide-react";

import AuthInput from "../components/AuthInput";
import AuthDivider from "../components/AuthDivider";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Button from "../../../3_components/common/Button";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { register, loading, error } = useAuth();

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
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

    setSubmitted(true);

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      // Error is handled by Redux
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-orange-100 bg-white p-6 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900">Create Account</h1>

        <p className="mt-2 text-gray-500">
          Join us for fresh homemade food, delivered fast.
        </p>
      </div>

      <div className="mb-6">
        <GoogleSignInButton />
      </div>

      <AuthDivider label="OR SIGN UP WITH EMAIL" />

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <AuthInput
          label="Full Name"
          name="full_name"
          icon={User}
          value={form.full_name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <AuthInput
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <AuthInput
          label="Phone Number"
          name="phone"
          type="tel"
          icon={Phone}
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
        />

        {submitted && error && (
          <p className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={!loading && <UserPlus size={18} />}
        >
          {loading ? "Please wait..." : "Register"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-orange-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;