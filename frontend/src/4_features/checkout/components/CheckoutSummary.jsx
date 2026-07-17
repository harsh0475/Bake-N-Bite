import {
  ShieldCheck,
  Clock3,
  ShoppingBag,
} from "lucide-react";

const CheckoutSummary = ({
  cart,
  loading = false,
  paymentMethod = "cod",
  onCheckout,
}) => {
  if (!cart) return null;

  const buttonText =
    paymentMethod === "COD"
      ? "Place Order"
      : `Pay ₹${cart.grand_total}`;

  return (
    <div className="sticky top-24 space-y-6">

      {/* ====================================================== */}
      {/* Order Summary */}
      {/* ====================================================== */}

      <div className="overflow-hidden rounded-[34px] border border-orange-100 bg-white shadow-xl">

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white">

          <div className="flex items-center gap-3">

            <ShoppingBag size={28} />

            <div>

              <h2 className="text-2xl font-black">
                Order Summary
              </h2>

              <p className="text-sm text-orange-100">
                Review before placing your order
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-5 p-6">

          <div className="flex justify-between">

            <span className="text-gray-600">
              Items ({cart.total_items})
            </span>

            <span className="font-semibold">
              ₹{Number(cart.subtotal).toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-600">
              Delivery Charges
            </span>

            {Number(cart.delivery_charge) === 0 ? (

              <span className="font-semibold text-green-600">
                FREE
              </span>

            ) : (

              <span className="font-semibold">
                ₹{Number(cart.delivery_charge).toFixed(2)}
              </span>

            )}

          </div>

          <div className="flex justify-between">

            <span className="text-gray-600">
              Packaging
            </span>

            <span className="font-semibold">
              ₹{Number(cart.packaging_charge).toFixed(2)}
            </span>

          </div>

          {Number(cart.discount) > 0 && (

            <div className="flex justify-between text-green-600">

              <span>
                Discount
              </span>

              <span className="font-bold">
                -₹{Number(cart.discount).toFixed(2)}
              </span>

            </div>

          )}

          <div className="border-t pt-5">

            <div className="flex items-center justify-between">

              <span className="text-lg font-semibold">
                Grand Total
              </span>

              <span className="text-4xl font-black text-orange-500">
                ₹{Number(cart.grand_total).toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Delivery Estimate */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-orange-100 p-4">

            <Clock3
              className="text-orange-500"
              size={24}
            />

          </div>

          <div>

            <h3 className="font-bold">
              Freshly Prepared
            </h3>

            <p className="mt-1 text-gray-500">
              Estimated delivery in
              30–45 minutes.
            </p>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Secure Payment */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-green-100 p-4">

            <ShieldCheck
              className="text-green-600"
              size={24}
            />

          </div>

          <div>

            <h3 className="font-bold text-green-700">
              Secure Checkout
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Your payment information is protected
              with industry-standard encryption.
            </p>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Checkout Button */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={onCheckout}
        disabled={loading}
        className={`w-full rounded-3xl py-5 text-xl font-bold text-white shadow-xl transition-all duration-300 ${
          loading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-[1.02]"
        }`}
      >
        {loading
          ? "Processing..."
          : buttonText}
      </button>

    </div>
  );
};

export default CheckoutSummary;