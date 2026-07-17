import {
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ShieldX,
  UserCheck,
  UserX,
  BadgeCheck,
} from "lucide-react";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

const CustomerDetails = () => {
  const { customerId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    selectedCustomer,
    loading,
    error,

    fetchCustomer,
    activateCustomer,
    deactivateCustomer,
    verifyCustomer,
  } = useAdmin();

  useEffect(() => {
    fetchCustomer(customerId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const handleActivate =
    async () => {
      try {
        await activateCustomer(
          customerId
        );

        toast.success(
          "Customer activated successfully."
        );

        fetchCustomer(customerId);

      } catch (error) {

        toast.error(
          error ||
            "Unable to activate customer."
        );

      }
    };

  const handleDeactivate =
    async () => {
      try {

        await deactivateCustomer(
          customerId
        );

        toast.success(
          "Customer deactivated successfully."
        );

        fetchCustomer(customerId);

      } catch (error) {

        toast.error(
          error ||
            "Unable to deactivate customer."
        );

      }
    };

  const handleVerify =
    async () => {
      try {

        await verifyCustomer(
          customerId
        );

        toast.success(
          "Customer verified successfully."
        );

        fetchCustomer(customerId);

      } catch (error) {

        toast.error(
          error ||
            "Unable to verify customer."
        );

      }
    };

  if (loading.customer) {
    return <LoadingSpinner />;
  }

  if (error.customer) {
    return (
      <ErrorState
        title="Unable to load customer"
        description={
          error.customer
        }
      />
    );
  }

  if (!selectedCustomer) {
    return (
      <ErrorState
        title="Customer not found"
        description="Requested customer does not exist."
      />
    );
  }

  return (
    <div className="space-y-8">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 text-white shadow-2xl sm:p-8 lg:p-10">

        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />

        <div className="absolute bottom-0 right-32 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-6">

            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white/20 text-5xl font-black backdrop-blur">

              {selectedCustomer.full_name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

                Customer Profile

              </span>

              <h1 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">

                {selectedCustomer.full_name}

              </h1>

              <p className="mt-3 text-sm text-orange-100 sm:text-base lg:text-lg">

                Customer ID #{selectedCustomer.id}

              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-orange-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-2xl"
          >

            <ArrowLeft size={20} />

            Back

          </button>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Information */}
      {/* ====================================================== */}

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Left */}

        <div className="rounded-[30px] border border-orange-100 bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-2xl font-black">

            Customer Information

          </h2>

          <div className="space-y-6">

            <InfoRow
              icon={<User size={20} />}
              title="Full Name"
              value={selectedCustomer.full_name}
            />

            <InfoRow
              icon={<Mail size={20} />}
              title="Email Address"
              value={selectedCustomer.email}
            />

            <InfoRow
              icon={<Phone size={20} />}
              title="Phone Number"
              value={selectedCustomer.phone}
            />

            <InfoRow
              icon={<BadgeCheck size={20} />}
              title="Role"
              value={selectedCustomer.role}
            />

            <InfoRow
              icon={<Calendar size={20} />}
              title="Joined"
              value={new Date(
                selectedCustomer.created_at
              ).toLocaleString()}
            />

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6">

          <div className="rounded-[30px] border border-orange-100 bg-white p-8 shadow-lg">

            <h2 className="mb-6 text-2xl font-black">

              Account Status

            </h2>

            <div className="space-y-5">

              <StatusCard
                title="Verification"
                active={
                  selectedCustomer.is_verified
                }
                activeText="Verified"
                inactiveText="Not Verified"
                activeIcon={
                  <ShieldCheck />
                }
                inactiveIcon={
                  <ShieldX />
                }
              />

              <StatusCard
                title="Account"
                active={
                  selectedCustomer.is_active
                }
                activeText="Active"
                inactiveText="Inactive"
                activeIcon={
                  <UserCheck />
                }
                inactiveIcon={
                  <UserX />
                }
              />

            </div>

          </div>

          <div className="rounded-[30px] border border-orange-100 bg-white p-8 shadow-lg">

            <h2 className="mb-6 text-2xl font-black">

              Account Actions

            </h2>

            <div className="space-y-4">

              {!selectedCustomer.is_verified && (

                <button
                  onClick={
                    handleVerify
                  }
                  className="w-full rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
                >

                  Verify Customer

                </button>

              )}

              {selectedCustomer.is_active ? (

                <button
                  onClick={
                    handleDeactivate
                  }
                  className="w-full rounded-2xl bg-red-500 py-4 font-semibold text-white transition hover:bg-red-600"
                >

                  Deactivate Account

                </button>

              ) : (

                <button
                  onClick={
                    handleActivate
                  }
                  className="w-full rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
                >

                  Activate Account

                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

const InfoRow = ({
  icon,
  title,
  value,
}) => (
  <div className="flex items-start gap-4">

    <div className="rounded-xl bg-orange-100 p-3 text-orange-600">

      {icon}

    </div>

    <div>

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <p className="mt-1 text-lg font-semibold">

        {value}

      </p>

    </div>

  </div>
);

const StatusCard = ({
  title,
  active,
  activeText,
  inactiveText,
  activeIcon,
  inactiveIcon,
}) => (
  <div
    className={`flex items-center justify-between rounded-2xl border p-5 ${
      active
        ? "border-green-200 bg-green-50"
        : "border-red-200 bg-red-50"
    }`}
  >

    <div>

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <h3
        className={`mt-2 text-lg font-bold ${
          active
            ? "text-green-700"
            : "text-red-700"
        }`}
      >

        {active
          ? activeText
          : inactiveText}

      </h3>

    </div>

    <div
      className={`rounded-full p-3 ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >

      {active
        ? activeIcon
        : inactiveIcon}

    </div>

  </div>
);

export default CustomerDetails;