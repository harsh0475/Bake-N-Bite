// src/4_features/auth/pages/ForgotPassword.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, SendHorizontal, CheckCircle2 } from "lucide-react";

import AuthInput from "../components/AuthInput";
import Button from "../../../3_components/common/Button";
import useAuth from "../hooks/useAuth";

const ForgotPassword = () => {
  const {
    forgotPassword,
    forgotPasswordLoading,
    forgotPasswordMessage,
    forgotPasswordError,
    clearForgotPasswordState,
  } = useAuth();

  const [email, setEmail] = useState("");

  useEffect(() => {
    return () => clearForgotPasswordState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
    } catch (err) {
      // Error is handled by Redux
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-orange-100 bg-white p-6 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900">
          Forgot Password?
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your email and we'll send you a link to reset it.
        </p>
      </div>

      {forgotPasswordMessage ? (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>

          <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {forgotPasswordMessage}
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
          />

          {forgotPasswordError && (
            <p className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
              {forgotPasswordError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={forgotPasswordLoading}
            rightIcon={!forgotPasswordLoading && <SendHorizontal size={18} />}
          >
            {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;