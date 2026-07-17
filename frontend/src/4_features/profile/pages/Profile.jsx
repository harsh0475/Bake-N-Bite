import {
  User,
  Mail,
  ShieldCheck,
  MapPin,
  Package,
  LogOut,
  Lock,
  Heart,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import PromoBanner from "../../../3_components/common/PromoBanner";

import useAuth from "../../auth/hooks/useAuth";
import useAddress from "../hooks/useAddress";
import useOrders from "../../orders/hooks/useOrders";

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { addresses, fetchAddresses } = useAddress();

  const { orders, fetchOrders } = useOrders();

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchAddresses();
    fetchOrders();
  }, [fetchAddresses, fetchOrders]);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) {
      return;
    }

    try {
      setLoggingOut(true);

      await logout();

      toast.success("Logged out successfully.");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout.");
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    {
      title: "My Addresses",
      subtitle: "Manage delivery addresses",
      icon: <MapPin size={22} />,
      onClick: () => navigate("/addresses"),
    },
    {
      title: "My Orders",
      subtitle: "Track and view previous orders",
      icon: <Package size={22} />,
      onClick: () => navigate("/orders"),
    },
    {
      title: "Wishlist",
      subtitle: "Coming Soon",
      icon: <Heart size={22} />,
      disabled: true,
    },
    {
      title: "Change Password",
      subtitle: "Update your account password",
      icon: <Lock size={22} />,
      onClick: () => navigate("/change-password"),
    },
  ];

  const initials =
    user?.full_name
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.substring(0, 2)
      ?.toUpperCase() || "U";

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Profile" },
          ]}
        />

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="👤 Your Account"
          title={user?.full_name || "Customer"}
          description={user?.email || "Manage your account, addresses and orders."}
          stats={[
            { value: orders.length, label: "Orders" },
            { value: addresses.length, label: "Addresses" },
            { value: "Soon", label: "Wishlist" },
          ]}
          className="mt-8"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-white text-2xl font-black text-orange-500 shadow-lg sm:h-24 sm:w-24 sm:text-3xl">
            {initials}
          </div>
        </PromoBanner>

        {/* ====================================================== */}
        {/* Account Badge Bar */}
        {/* ====================================================== */}

        <div className="my-8 flex items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-sm lg:px-6 lg:py-5">
          <div>
            <h2 className="text-xl font-black text-gray-900 lg:text-2xl">
              Account Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your personal details and quick access menu.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            <BadgeCheck size={20} />
            <span className="capitalize">{user?.role || "Customer"}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          {/* ====================================================== */}
          {/* Left */}
          {/* ====================================================== */}

          <div className="space-y-6">
            <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-md lg:p-6">
              <div className="mb-4">
                <h2 className="text-xl font-black text-gray-900 lg:text-2xl">
                  Account Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your personal account details.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900">
                      {user?.full_name || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">
                      {user?.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Account</p>
                    <p className="font-semibold capitalize text-gray-900">
                      {user?.role || "Customer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={loggingOut}
              onClick={handleLogout}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-semibold text-white transition-all duration-300 ${
                loggingOut
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-red-500 hover:-translate-y-1 hover:bg-red-600 hover:shadow-xl"
              }`}
            >
              <LogOut size={20} />
              {loggingOut ? "Logging Out..." : "Logout"}
            </button>
          </div>

          {/* ====================================================== */}
          {/* Right */}
          {/* ====================================================== */}

          <div className="space-y-6">
            {menuItems.map((item) => (
              <button
                key={item.title}
                type="button"
                disabled={item.disabled}
                onClick={item.onClick}
                className={`flex w-full items-center justify-between rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 ${
                  item.disabled
                    ? "cursor-not-allowed opacity-60"
                    : "hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className="rounded-2xl bg-orange-100 p-4 text-orange-500">
                    {item.icon}
                  </div>

                  <div className="text-left">
                    <h3 className="text-lg font-black text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-gray-500">{item.subtitle}</p>
                  </div>
                </div>

                {!item.disabled && (
                  <ChevronRight size={24} className="text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Profile;