import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

import useOrders from "../hooks/useOrders";
import usePayment from "../../payment/hooks/usePayment";
import useReviews from "../../reviews/hooks/useReviews";
import {
  loadRazorpay,
  openRazorpayCheckout,
} from "../../payment/services/razorpayService";

import ReviewModal from "../../reviews/components/ReviewModal";

import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import Button from "../../../3_components/common/Button";

const OrderDetails = () => {
  const { id } = useParams();

  const { selectedOrder, loading, fetchOrder } = useOrders();

  const {
    payment,
    fetchPayment,
    retryPayment,
    verifyPayment,
    changePaymentMethod,
  } = usePayment();

  const {
    myReviews,
    submitting: submittingReview,
    fetchMyReviews,
    createReview,
    updateReview,
  } = useReviews();

  const [reviewItem, setReviewItem] = useState(null);

  useEffect(() => {
    fetchOrder(id);
    fetchPayment(id);
    fetchMyReviews();
  }, [id, fetchOrder, fetchPayment, fetchMyReviews]);

  const getReviewForProduct = (productId) =>
    myReviews.find((review) => review.product_id === productId);

  const handleReviewSubmit = async (data) => {
    try {
      const existing = getReviewForProduct(data.product_id);

      if (existing) {
        await updateReview(existing.id, {
          rating: data.rating,
          title: data.title,
          comment: data.comment,
        });

        toast.success("Review updated successfully.");
      } else {
        await createReview(data);

        toast.success("Thanks for your review!");
      }

      setReviewItem(null);
    } catch (error) {
      toast.error(error || "Unable to submit review.");
    }
  };

  const handleRetryPayment = async () => {
    try {
      const sdkLoaded = await loadRazorpay();

      if (!sdkLoaded) {
        toast.error("Unable to load Razorpay.");
        return;
      }

      const razorpayOrder = await retryPayment(id);

      openRazorpayCheckout({
        order: razorpayOrder,

        customer: {
          name: razorpayOrder.customer?.name || selectedOrder.delivery_name,
          phone: razorpayOrder.customer?.phone || selectedOrder.delivery_phone,
          email: "",
        },

        onSuccess: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            await fetchPayment(id);
            await fetchOrder(id);

            toast.success("Payment Successful");
          } catch (error) {
            toast.error(error || "Payment verification failed.");
          }
        },

        onFailure: () => {
          toast.info("Payment cancelled.");
        },
      });
    } catch (error) {
      toast.error(error || "Unable to retry payment.");
    }
  };

  const handleChangePaymentMethod = async (paymentMethod) => {
    try {
      await changePaymentMethod(id, paymentMethod);
      await fetchPayment(id);
      await fetchOrder(id);

      toast.success("Payment method updated.");
    } catch (error) {
      toast.error(error || "Unable to change payment method.");
    }
  };

  if (loading || !selectedOrder) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-24">
        <LoadingSpinner text="Fetching order details..." />
      </div>
    );
  }

  const ORDER_HEADER = {
    Pending: {
      title: "🛒 Order Placed",
      message: "We've received your order and will confirm it shortly.",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      titleColor: "text-yellow-700",
    },
    Confirmed: {
      title: "✅ Order Confirmed",
      message: "Your order has been confirmed by Bake N Bite.",
      bg: "bg-blue-50",
      border: "border-blue-200",
      titleColor: "text-blue-700",
    },
    Preparing: {
      title: "👨‍🍳 Preparing Your Food",
      message: "Our kitchen is preparing your delicious meal.",
      bg: "bg-orange-50",
      border: "border-orange-200",
      titleColor: "text-orange-700",
    },
    Ready: {
      title: "🍽️ Order Ready",
      message: "Your order is packed and ready.",
      bg: "bg-purple-50",
      border: "border-purple-200",
      titleColor: "text-purple-700",
    },
    "Out For Delivery": {
      title: "🛵 Out For Delivery",
      message: "Your order is on the way.",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      titleColor: "text-indigo-700",
    },
    Delivered: {
      title: "🎉 Order Delivered",
      message:
        "Your order has been successfully delivered. We hope you enjoyed your meal. Thank you for choosing Bake N Bite!",
      bg: "bg-green-50",
      border: "border-green-200",
      titleColor: "text-green-700",
    },
    Cancelled: {
      title: "❌ Order Cancelled",
      message: "This order has been cancelled.",
      bg: "bg-red-50",
      border: "border-red-200",
      titleColor: "text-red-700",
    },
  };

  const header = ORDER_HEADER[selectedOrder.status] ?? ORDER_HEADER.Pending;

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container size="wide">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "My Orders", href: "/orders" },
            { label: selectedOrder.order_number },
          ]}
        />

        {/* Header */}

        <div
          className={`mb-8 rounded-[28px] border p-6 sm:p-8 ${header.bg} ${header.border}`}
        >
          <h1 className={`text-3xl font-black sm:text-4xl ${header.titleColor}`}>
            {header.title}
          </h1>

          <p className="mt-3 text-gray-600">{header.message}</p>

          <p className="mt-4 font-semibold text-gray-900">
            Order Number : {selectedOrder.order_number}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT */}

          <div className="space-y-8 lg:col-span-2">
            {/* Status */}

            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-2xl font-black text-gray-900">
                Order Status
              </h2>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-700">
                  {selectedOrder.status}
                </span>

                <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
                  Payment : {selectedOrder.payment_status}
                </span>
              </div>
            </div>

            {/* Delivery Address */}

            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-2xl font-black text-gray-900">
                Delivery Address
              </h2>

              <p className="font-semibold text-gray-900">
                {selectedOrder.delivery_name}
              </p>

              <p className="text-gray-600">{selectedOrder.delivery_phone}</p>

              <p className="mt-2 text-gray-600">
                {selectedOrder.delivery_address_line_1}
              </p>

              {selectedOrder.delivery_address_line_2 && (
                <p className="text-gray-600">
                  {selectedOrder.delivery_address_line_2}
                </p>
              )}

              {selectedOrder.delivery_landmark && (
                <p className="text-gray-600">
                  Landmark : {selectedOrder.delivery_landmark}
                </p>
              )}

              <p className="text-gray-600">
                {selectedOrder.delivery_city}, {selectedOrder.delivery_state}
              </p>

              <p className="text-gray-600">
                {selectedOrder.delivery_postal_code}
              </p>
            </div>

            {/* Items */}

            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-black text-gray-900">
                Ordered Items
              </h2>

              <div className="space-y-4">
                {selectedOrder.order_items.map((item) => {
                  const existingReview =
                    item.product_id &&
                    getReviewForProduct(item.product_id);

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-orange-100 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.product_name}
                          </h3>

                          <p className="text-gray-500">Qty : {item.quantity}</p>
                        </div>

                        <div className="text-lg font-black text-gray-900">
                          ₹{item.subtotal}
                        </div>
                      </div>

                      {selectedOrder.status === "Delivered" &&
                        item.product_id && (
                          <button
                            type="button"
                            onClick={() =>
                              setReviewItem({
                                id: item.product_id,
                                name: item.product_name,
                              })
                            }
                            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 transition hover:bg-orange-100"
                          >
                            <Star
                              size={14}
                              className={
                                existingReview
                                  ? "fill-orange-500 text-orange-500"
                                  : ""
                              }
                            />
                            {existingReview
                              ? "Edit Your Review"
                              : "Write a Review"}
                          </button>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Note */}

            {selectedOrder.customer_note && (
              <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-2xl font-black text-gray-900">
                  Customer Note
                </h2>

                <p className="text-gray-600">{selectedOrder.customer_note}</p>
              </div>
            )}
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            {/* Bill */}

            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-black text-gray-900">
                Bill Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ₹{selectedOrder.subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>

                  {Number(selectedOrder.delivery_charge) === 0 ? (
                    <span className="font-semibold text-green-600">FREE</span>
                  ) : (
                    <span className="text-gray-900">
                      ₹{selectedOrder.delivery_charge}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Packaging</span>
                  <span className="text-gray-900">
                    ₹{selectedOrder.packaging_charge}
                  </span>
                </div>

                {Number(selectedOrder.discount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{selectedOrder.discount}</span>
                  </div>
                )}

                <hr className="border-orange-100" />

                <div className="flex justify-between text-2xl font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-orange-500">
                    ₹{selectedOrder.grand_total}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment */}

            {payment && (
              <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-black text-gray-900">
                  Payment Details
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method</span>
                    <span className="font-semibold text-gray-900">
                      {payment.payment_method}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>

                    <span
                      className={`font-semibold ${
                        payment.payment_status === "Paid"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ETA */}

            {selectedOrder.estimated_delivery_time && (
              <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-black text-gray-900">
                  Estimated Delivery
                </h2>

                <p className="text-gray-600">
                  {new Date(
                    selectedOrder.estimated_delivery_time
                  ).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}

            {/* Payment Actions */}

            {payment &&
              payment.payment_status !== "Paid" &&
              selectedOrder.status !== "Delivered" &&
              selectedOrder.status !== "Cancelled" && (
                <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-xl font-black text-gray-900">
                    Payment Actions
                  </h2>

                  <div className="space-y-4">
                    {/* Razorpay */}

                    {payment.payment_method === "Razorpay" && (
                      <Button
                        type="button"
                        fullWidth
                        disabled={loading}
                        onClick={handleRetryPayment}
                      >
                        Pay Now
                      </Button>
                    )}

                    {/* Change to COD */}

                    {payment.payment_method !== "Cash On Delivery" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleChangePaymentMethod("Cash On Delivery")
                        }
                        className="w-full rounded-xl border border-orange-500 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
                      >
                        Change to Cash On Delivery
                      </button>
                    )}

                    {/* Change to Razorpay */}

                    {payment.payment_method !== "Razorpay" && (
                      <button
                        type="button"
                        onClick={() => handleChangePaymentMethod("Razorpay")}
                        className="w-full rounded-xl border border-blue-500 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        Change to Razorpay
                      </button>
                    )}
                  </div>
                </div>
              )}

            <Link
              to="/products"
              className="block w-full rounded-2xl bg-orange-500 py-4 text-center font-semibold text-white transition hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Container>

      <ReviewModal
        isOpen={!!reviewItem}
        product={reviewItem}
        existingReview={
          reviewItem ? getReviewForProduct(reviewItem.id) : null
        }
        submitting={submittingReview}
        onClose={() => setReviewItem(null)}
        onSubmit={handleReviewSubmit}
      />
    </section>
  );
};

export default OrderDetails;