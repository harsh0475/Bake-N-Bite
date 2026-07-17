import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Receipt,
} from "lucide-react";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

const STATUS_BADGES = {
  Pending:
    "bg-yellow-100 text-yellow-800",

  Confirmed:
    "bg-blue-100 text-blue-800",

  Preparing:
    "bg-orange-100 text-orange-800",

  Ready:
    "bg-purple-100 text-purple-800",

  "Out For Delivery":
    "bg-indigo-100 text-indigo-800",

  Delivered:
    "bg-green-100 text-green-800",

  Cancelled:
    "bg-red-100 text-red-800",
};

const PAYMENT_BADGES = {
  Pending:
    "bg-yellow-100 text-yellow-800",

  Paid:
    "bg-green-100 text-green-800",

  Failed:
    "bg-red-100 text-red-800",

  Refunded:
    "bg-blue-100 text-blue-800",
};

const OrderDetails = () => {

  const { orderId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    selectedOrder,

    loading,

    error,

    fetchOrder,

    updateOrderStatus,

    updatePaymentStatus,

  } = useAdmin();

  const [
    status,
    setStatus,
  ] = useState("");

  useEffect(() => {

    fetchOrder(orderId);

  }, [
    fetchOrder,
    orderId,
  ]);

  useEffect(() => {

    if (selectedOrder) {

      setStatus(
        selectedOrder.status
      );

    }

  }, [
    selectedOrder,
  ]);

  const handleOrderStatus =
    async () => {

      try {

        await updateOrderStatus(
          orderId,
          status
        );

        await fetchOrder(orderId);

        toast.success(
          "Order status updated successfully."
        );

      } catch (error) {

        toast.error(
          error ||
            "Unable to update order."
        );

      }

    };

  const handlePaymentStatus =
    async () => {

      try {

        await updatePaymentStatus(
          orderId,
          "Paid"
        );

        await fetchOrder(orderId);

        toast.success(
          "Payment marked as paid."
        );

      } catch (error) {

        toast.error(
          error ||
            "Unable to update payment."
        );

      }

    };

  if (loading.order) {
    return (
      <LoadingSpinner />
    );
  }

  if (error.order) {

    return (
      <ErrorState
        title="Unable to load order"
        description={
          error.order
        }
      />
    );

  }

  if (!selectedOrder) {

    return (
      <ErrorState
        title="Order not found"
        description="The requested order does not exist."
      />
    );

  }

  const payment =
    selectedOrder.payment;

  const isCOD =
    payment?.payment_method ===
    "Cash On Delivery";

  const isPaymentPending =
    payment?.payment_status ===
    "Pending";

  return (

    <div className="space-y-8">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 text-white shadow-2xl sm:p-8 lg:p-10">

        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />

        <div className="absolute bottom-0 right-32 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              📦 Order Details
            </span>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">

              {selectedOrder.order_number}

            </h1>

            <p className="mt-3 text-sm text-orange-100 sm:text-base">

              Placed on{" "}
              {new Date(
                selectedOrder.created_at
              ).toLocaleString()}

            </p>

          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-orange-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-2xl lg:w-auto"
          >

            <ArrowLeft size={20} />

            Back

          </button>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Customer + Order Status + Payment */}
      {/* ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* ====================================================== */}
        {/* Customer */}
        {/* ====================================================== */}

        <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">

              <MapPin size={22} />

            </div>

            <h2 className="text-xl font-black text-gray-900">

              Customer

            </h2>

          </div>

          <div className="space-y-3 text-sm">

            <p>

              <span className="font-semibold text-gray-900">Name:</span>{" "}

              <span className="text-gray-600">{selectedOrder.delivery_name}</span>

            </p>

            <p>

              <span className="font-semibold text-gray-900">Phone:</span>{" "}

              <span className="text-gray-600">{selectedOrder.delivery_phone}</span>

            </p>

            <div className="rounded-2xl bg-orange-50 p-4">

              <p className="font-semibold text-gray-900">

                Delivery Address

              </p>

              <p className="mt-2 leading-6 text-gray-600">

                {
                  selectedOrder.delivery_address_line_1
                }

              </p>

              {selectedOrder.delivery_address_line_2 && (

                <p className="leading-6 text-gray-600">

                  {
                    selectedOrder.delivery_address_line_2
                  }

                </p>

              )}

              {selectedOrder.delivery_landmark && (

                <p className="leading-6 text-gray-600">

                  {
                    selectedOrder.delivery_landmark
                  }

                </p>

              )}

              <p className="leading-6 text-gray-600">

                {selectedOrder.delivery_city},{" "}

                {
                  selectedOrder.delivery_state
                }{" "}

                {
                  selectedOrder.delivery_postal_code
                }

              </p>

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Order Status */}
        {/* ====================================================== */}

        <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">

              <Package size={22} />

            </div>

            <h2 className="text-xl font-black text-gray-900">

              Order Status

            </h2>

          </div>

          <div
            className={`mb-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              STATUS_BADGES[
                selectedOrder.status
              ] ??
              "bg-gray-100 text-gray-700"
            }`}
          >

            {selectedOrder.status}

          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 px-4 py-3.5 text-sm text-gray-700 shadow-sm outline-none transition-all hover:border-orange-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
          >

            <option>Pending</option>

            <option>Confirmed</option>

            <option>Preparing</option>

            <option>Ready</option>

            <option>
              Out For Delivery
            </option>

            <option>
              Delivered
            </option>

            <option>
              Cancelled
            </option>

          </select>

          <button
            onClick={
              handleOrderStatus
            }
            disabled={
              loading.updateOrderStatus
            }
            className="mt-5 w-full rounded-2xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading.updateOrderStatus
              ? "Saving..."
              : "Update Status"}

          </button>

        </div>

        {/* ====================================================== */}
        {/* Payment Information */}
        {/* ====================================================== */}

        <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">

              <CreditCard size={22} />

            </div>

            <h2 className="text-xl font-black text-gray-900">

              Payment Information

            </h2>

          </div>

          <div className="space-y-4">

            <div>

              <p className="text-sm text-gray-500">

                Payment Method

              </p>

              <p className="font-semibold text-gray-900">

                {payment?.payment_method}

              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">

                Payment Status

              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                  PAYMENT_BADGES[
                    payment?.payment_status
                  ] ??
                  "bg-gray-100 text-gray-700"
                }`}
              >

                {
                  payment?.payment_status
                }

              </span>

            </div>

            {/* COD Payment Action */}

            {isCOD ? (

              isPaymentPending ? (

                <button
                  onClick={
                    handlePaymentStatus
                  }
                  disabled={
                      loading.updatePaymentStatus ||
                      selectedOrder.status !== "Delivered"
                  }
                  className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-bold text-white shadow-md transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {
                  loading.updatePaymentStatus
                      ? "Updating..."
                      : selectedOrder.status === "Delivered"
                          ? "Mark as Paid"
                          : "Deliver order first"
                  }

                </button>

              ) : (

                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-4">

                  <p className="font-semibold text-green-700">

                    ✓ Payment Received

                  </p>

                  {payment?.paid_at && (

                    <p className="mt-1 text-sm text-green-600">

                      Paid at{" "}

                      {new Date(
                        payment.paid_at
                      ).toLocaleString()}

                    </p>

                  )}

                </div>

              )

            ) : (

              <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-4">

                <p className="font-semibold text-orange-700">

                  Payment is managed automatically.

                </p>

                <p className="mt-1 text-sm text-orange-600">

                  Manual updates are disabled for online payments.

                </p>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Ordered Items */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">

            <Package size={22} />

          </div>

          <h2 className="text-xl font-black text-gray-900">

            Ordered Items

          </h2>

        </div>

        {/* Mobile Cards */}

        <div className="space-y-3 md:hidden">

          {selectedOrder.order_items.map(
            (item) => (

              <div
                key={item.id}
                className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4"
              >

                <div className="flex items-center justify-between gap-3">

                  <p className="font-semibold text-gray-900">

                    {item.product_name}

                  </p>

                  <p className="shrink-0 font-bold text-orange-600">

                    ₹{Number(item.subtotal).toFixed(2)}

                  </p>

                </div>

                <p className="mt-2 text-sm text-gray-500">

                  Qty {item.quantity} × ₹{Number(item.unit_price).toFixed(2)}

                </p>

              </div>

            )
          )}

        </div>

        {/* Desktop Table */}

        <div className="hidden overflow-x-auto md:block">

          <table className="min-w-full">

            <thead>

              <tr className="border-b border-orange-100">

                <th className="py-3 text-left text-sm font-bold uppercase tracking-wide text-gray-600">

                  Product

                </th>

                <th className="py-3 text-center text-sm font-bold uppercase tracking-wide text-gray-600">

                  Qty

                </th>

                <th className="py-3 text-right text-sm font-bold uppercase tracking-wide text-gray-600">

                  Price

                </th>

                <th className="py-3 text-right text-sm font-bold uppercase tracking-wide text-gray-600">

                  Total

                </th>

              </tr>

            </thead>

            <tbody>

              {selectedOrder.order_items.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-b border-orange-50 last:border-0"
                  >

                    <td className="py-4">

                      {item.product_name}

                    </td>

                    <td className="py-4 text-center">

                      {item.quantity}

                    </td>

                    <td className="py-4 text-right">

                      ₹
                      {Number(
                        item.unit_price
                      ).toFixed(2)}

                    </td>

                    <td className="py-4 text-right font-semibold text-gray-900">

                      ₹
                      {Number(
                        item.subtotal
                      ).toFixed(2)}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Payment Summary */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">

            <Receipt size={22} />

          </div>

          <h2 className="text-xl font-black text-gray-900">

            Payment Summary

          </h2>

        </div>

        <div className="space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-gray-600">

              Subtotal

            </span>

            <span className="font-medium text-gray-900">

              ₹
              {Number(
                selectedOrder.subtotal
              ).toFixed(2)}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-600">

              Delivery Charge

            </span>

            <span className="font-medium text-gray-900">

              ₹
              {Number(
                selectedOrder.delivery_charge
              ).toFixed(2)}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-600">

              Packaging Charge

            </span>

            <span className="font-medium text-gray-900">

              ₹
              {Number(
                selectedOrder.packaging_charge
              ).toFixed(2)}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-600">

              Discount

            </span>

            <span className="font-medium text-gray-900">

              ₹
              {Number(
                selectedOrder.discount
              ).toFixed(2)}

            </span>

          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-orange-50 px-5 py-4">

            <span className="text-lg font-black text-gray-900">

              Grand Total

            </span>

            <span className="text-2xl font-black text-orange-600">

              ₹
              {Number(
                selectedOrder.grand_total
              ).toFixed(2)}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;
