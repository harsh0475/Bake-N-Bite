import {
  Receipt,
  ShoppingBag,
  Truck,
  Gift,
  CreditCard,
  ShieldCheck,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

import useCart from "../hooks/useCart";

const FREE_DELIVERY_LIMIT = 499;

const CartSummary = ({ cart, onCheckout }) => {
  const { clear, updating } = useCart();

  const subtotal = Number(cart.subtotal);
  const deliveryCharge = Number(cart.delivery_charge);
  const packagingCharge = Number(cart.packaging_charge);
  const discount = Number(cart.discount);
  const grandTotal = Number(cart.grand_total);

  const amountRemaining = Math.max(
    0,
    FREE_DELIVERY_LIMIT - subtotal
  );

  const progress = Math.min(
    100,
    (subtotal / FREE_DELIVERY_LIMIT) * 100
  );

  const handleClearCart = async () => {
    const confirmed = window.confirm(
      "Clear all items from your cart?"
    );

    if (!confirmed) return;

    try {
      await clear();
      toast.success("Cart cleared successfully.");
    } catch {
      toast.error("Unable to clear cart.");
    }
  };

  return (
    <div
      className="
        sticky
        top-24
        overflow-hidden
        rounded-2xl
        border
        border-orange-100
        bg-white
        shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-4 text-white">

        <Receipt size={22} />

        <h2 className="text-lg font-bold">

          Order Summary

        </h2>

      </div>

      <div className="space-y-4 p-4 lg:p-5">

        {/* FREE DELIVERY */}

        <div className="rounded-xl bg-orange-50 p-3">

          {amountRemaining > 0 ? (

            <>

              <div className="flex items-center justify-between">

                <span className="text-sm font-medium text-orange-700">

                  🚚 Free Delivery

                </span>

                <span className="text-xs font-semibold text-orange-600">

                  ₹{amountRemaining.toFixed(0)} left

                </span>

              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-orange-200">

                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </>

          ) : (

            <div className="text-center text-sm font-semibold text-green-600">

              🎉 Free Delivery Unlocked

            </div>

          )}

        </div>

        {/* PRICE DETAILS */}

        <div className="space-y-3 text-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <ShoppingBag
                size={16}
                className="text-orange-500"
              />

              <span>Items</span>

            </div>

            <span className="font-semibold">

              {cart.total_items}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span>Subtotal</span>

            <span className="font-semibold">

              ₹{subtotal.toFixed(2)}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Truck
                size={16}
                className="text-blue-500"
              />

              <span>Delivery</span>

            </div>

            {deliveryCharge === 0 ? (

              <span className="font-semibold text-green-600">

                FREE

              </span>

            ) : (

              <span className="font-semibold">

                ₹{deliveryCharge.toFixed(2)}

              </span>

            )}

          </div>

          <div className="flex items-center justify-between">

            <span>Packaging</span>

            <span className="font-semibold">

              ₹{packagingCharge.toFixed(2)}

            </span>

          </div>

          {discount > 0 && (

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Gift
                  size={16}
                  className="text-green-600"
                />

                <span>Discount</span>

              </div>

              <span className="font-semibold text-green-600">

                -₹{discount.toFixed(2)}

              </span>

            </div>

          )}

        </div>

        {/* TOTAL */}

        <div className="rounded-xl bg-orange-50 px-4 py-3">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-gray-500">

                Grand Total

              </p>

              <h2 className="text-2xl font-black text-orange-500">

                ₹{grandTotal.toFixed(2)}

              </h2>

            </div>

            <CreditCard
              size={28}
              className="text-orange-500"
            />

          </div>

        </div>

        {/* SECURE */}

        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2">

          <ShieldCheck
            size={18}
            className="text-green-600"
          />

          <span className="text-sm font-medium text-green-700">

            Secure Checkout

          </span>

        </div>

        {/* BUTTONS */}

        <button
          type="button"
          disabled={updating}
          onClick={handleClearCart}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            py-3
            font-semibold
            text-red-600
            transition
            hover:bg-red-50
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <Trash2 size={18} />

          Clear Cart

        </button>

        <button
          type="button"
          disabled={updating}
          onClick={onCheckout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-600
            py-3.5
            font-semibold
            text-white
            transition
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          Proceed to Checkout

          <ArrowRight size={18} />

        </button>

      </div>
    </div>
  );
};

export default CartSummary;