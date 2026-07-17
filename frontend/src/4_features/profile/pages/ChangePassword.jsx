import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Lock, KeyRound, ShieldCheck } from "lucide-react";

import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import Button from "../../../3_components/common/Button";
import AuthInput from "../../auth/components/AuthInput";

import { changePasswordRequest } from "../api/passwordApi";

const emptyForm = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormError("");

    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const getErrorMessage = (error, fallback) => {
    const detail = error.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail[0]?.msg || fallback;
    }

    if (typeof detail === "string") {
      return detail;
    }

    return fallback;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (form.new_password.length < 8) {
      setFormError("New password must be at least 8 characters long.");
      return;
    }

    if (form.new_password !== form.confirm_password) {
      setFormError("New password and confirm password do not match.");
      return;
    }

    if (form.new_password === form.current_password) {
      setFormError("New password must be different from the current password.");
      return;
    }

    try {
      setLoading(true);

      await changePasswordRequest(form);

      toast.success("Password changed successfully.");
      setForm(emptyForm);
      navigate("/profile");
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to change password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Profile", href: "/profile" },
            { label: "Change Password" },
          ]}
        />

        <div className="mx-auto max-w-xl">
          {/* ====================================================== */}
          {/* Header */}
          {/* ====================================================== */}

          <div className="mb-8 flex items-center gap-4 rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-sm lg:px-6 lg:py-5">
            <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h1 className="text-xl font-black text-gray-900 lg:text-2xl">
                Change Password
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Keep your account secure with a strong password.
              </p>
            </div>
          </div>

          {/* ====================================================== */}
          {/* Form */}
          {/* ====================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-orange-100 bg-white p-4 shadow-md sm:p-8"
          >
            <AuthInput
              label="Current Password"
              name="current_password"
              type="password"
              icon={Lock}
              value={form.current_password}
              onChange={handleChange}
              placeholder="Enter your current password"
            />

            <AuthInput
              label="New Password"
              name="new_password"
              type="password"
              icon={KeyRound}
              value={form.new_password}
              onChange={handleChange}
              placeholder="Enter a new password"
            />

            <AuthInput
              label="Confirm New Password"
              name="confirm_password"
              type="password"
              icon={KeyRound}
              value={form.confirm_password}
              onChange={handleChange}
              placeholder="Re-enter the new password"
            />

            <p className="text-xs text-gray-500">
              Use at least 8 characters. Avoid reusing your current password.
            </p>

            {formError && (
              <p className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                {formError}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                size="lg"
                fullWidth
                loading={loading}
                leftIcon={!loading && <ShieldCheck size={20} />}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ChangePassword;