import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  Clock3,
  Leaf,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

import { toast } from "react-toastify";

import useCart from "../../cart/hooks/useCart";

import QuantitySelector from "./QuantitySelector";

const ProductActions = ({ product }) => {

  const { addItem } = useCart();

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // Quantity
  // ======================================================

  const increaseQuantity = () => {
    setQuantity((previous) =>
      Math.min(previous + 1, 20)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  // ======================================================
  // Total Price
  // ======================================================

  const unitPrice = useMemo(() => {

    return Number(
      product.discount_price ||
        product.price
    );

  }, [
    product.discount_price,
    product.price,
  ]);

  const totalPrice =
    unitPrice * quantity;

  // ======================================================
  // Add To Cart
  // ======================================================

  const handleAddToCart = async () => {

    if (!product?.is_available) {
      return;
    }

    try {

      setLoading(true);

      await addItem({
        product_id: product.id,
        quantity,
      });

      toast.success(
        `${product.name} added to cart`
      );

    } catch (error) {

      toast.error(
        error?.message ||
          "Unable to add product."
      );

    } finally {

      setLoading(false);

    }

  };

  // ======================================================
  // Buy Now
  // ======================================================

  const handleBuyNow = async () => {

    await handleAddToCart();

    // Checkout navigation later

  };

  return (

    <div className="space-y-8">

      {/* ========================================= */}
      {/* Price Summary */}
      {/* ========================================= */}

      <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white shadow-2xl">

        <div className="p-8">

          <div className="flex items-center gap-3">

            <Sparkles
              size={20}
            />

            <span className="font-semibold">

              Freshly Prepared

            </span>

          </div>

          <h2 className="mt-6 text-5xl font-black">

            ₹{totalPrice.toFixed(2)}

          </h2>

          <p className="mt-2 text-orange-100">

            Total for {quantity} item
            {quantity > 1 ? "s" : ""}

          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

              <Clock3
                size={22}
              />

              <p className="mt-3 text-xs">

                30-45 mins

              </p>

            </div>

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

              <Leaf
                size={22}
              />

              <p className="mt-3 text-xs">

                Homemade

              </p>

            </div>

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">

              <BadgeCheck
                size={22}
              />

              <p className="mt-3 text-xs">

                Fresh

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* Quantity */}
      {/* ========================================= */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-7 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold">

              Select Quantity

            </h3>

            <p className="mt-1 text-gray-500">

              Change quantity before ordering.

            </p>

          </div>

          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />

        </div>

      </div>

      {/* ========================================= */}
      {/* Action Buttons */}
      {/* ========================================= */}

      <div className="grid gap-4">

        <button
          type="button"
          disabled={
            loading ||
            !product.is_available
          }
          onClick={handleAddToCart}
          className={`
            flex
            items-center
            justify-center
            gap-3
            rounded-[22px]
            py-5
            text-lg
            font-bold
            shadow-lg
            transition-all
            duration-300
            ${
              product.is_available
                ? "bg-orange-500 text-white hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
                : "cursor-not-allowed bg-gray-300 text-white"
            }
          `}
        >

          <ShoppingCart size={22} />

          {loading
            ? "Adding..."
            : "Add To Cart"}

        </button>

        <button
          type="button"
          disabled={
            loading ||
            !product.is_available
          }
          onClick={handleBuyNow}
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-[22px]
            border-2
            border-orange-500
            bg-white
            py-5
            text-lg
            font-bold
            text-orange-500
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-orange-500
            hover:text-white
            hover:shadow-xl
            disabled:border-gray-300
            disabled:text-gray-300
          "
        >

          <Zap size={22} />

          Buy Now

        </button>

      </div>

      {/* ========================================= */}
      {/* Why Order From Us */}
      {/* ========================================= */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-7 shadow-lg">

        <h3 className="mb-6 text-xl font-bold">

          Why You'll Love It

        </h3>

        <div className="space-y-5">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-orange-100 p-3">

              <Truck
                className="text-orange-500"
                size={22}
              />

            </div>

            <div>

              <h4 className="font-semibold">

                Fast Local Delivery

              </h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">

                Freshly prepared and delivered
                within approximately 30–45 minutes.

              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-green-100 p-3">

              <Leaf
                className="text-green-600"
                size={22}
              />

            </div>

            <div>

              <h4 className="font-semibold">

                Homemade Goodness

              </h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">

                Prepared in a hygienic kitchen
                using fresh ingredients.

              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-blue-100 p-3">

              <ShieldCheck
                className="text-blue-600"
                size={22}
              />

            </div>

            <div>

              <h4 className="font-semibold">

                Secure Checkout

              </h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">

                Safe payments and reliable order
                tracking.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* Out Of Stock */}
      {/* ========================================= */}

      {!product.is_available && (

        <div className="rounded-[24px] border border-red-200 bg-red-50 p-6">

          <h3 className="font-bold text-red-600">

            Currently Unavailable

          </h3>

          <p className="mt-2 leading-7 text-red-500">

            This item is temporarily unavailable.
            Please check back later or browse
            similar products.

          </p>

        </div>

      )}

    </div>

  );

};

export default ProductActions;