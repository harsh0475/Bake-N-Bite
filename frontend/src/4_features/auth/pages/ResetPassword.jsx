// src/4_features/auth/pages/ResetPassword.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock, KeyRound, CheckCircle2 } from "lucide-react";

import AuthInput from "../components/AuthInput";
import Button from "../../../3_components/common/Button";
import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    resetPassword,
    resetPasswordLoading,
    resetPasswordMessage,
    resetPasswordError,
    clearResetPasswordState,
  } = useAuth();

  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    return () => clearResetPasswordState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (form.new_password.length < 8) {
      setFormError("Password must be at least 8 characters long.");
      return;
    }

    if (form.new_password !== form.confirm_password) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({ token, new_password: form.new_password });
    } catch (err) {
      // Error is handled by Redux
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-orange-100 bg-white p-6 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900">Reset Password</h1>

        <p className="mt-2 text-gray-500">
          Choose a new password for your account.
        </p>
      </div>

      {resetPasswordMessage ? (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>

          <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {resetPasswordMessage}
          </p>

          <Button
            fullWidth
            size="lg"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="New Password"
            name="new_password"
            type="password"
            icon={Lock}
            value={form.new_password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <AuthInput
            label="Confirm New Password"
            name="confirm_password"
            type="password"
            icon={Lock}
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Re-enter new password"
          />

          {(formError || resetPasswordError) && (
            <p className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
              {formError || resetPasswordError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={resetPasswordLoading}
            rightIcon={!resetPasswordLoading && <KeyRound size={18} />}
          >
            {resetPasswordLoading ? "Resetting..." : "Reset Password"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-orange-500">
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;