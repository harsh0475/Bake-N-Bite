import { Link } from "react-router-dom";
import { Heart, Clock, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

import ProductRating from "./ProductRating";
import ProductBadge from "./ProductBadge";

import useCart from "../../cart/hooks/useCart";

import productPlaceholder from "../../../2_assets/images/product-placeholder.png";
import { API_BASE_URL } from "../../../8_constants/config";

const MAX_QUANTITY = 20;

const ProductCard = ({ product }) => {

  const {
    cart,
    updating,
    addItem,
    updateItem,
    removeItem,
  } = useCart();

  const cartItem = cart?.items?.find(
    (item) => item.product_id === product.id
  );

  const imagePath =
    product.images?.find(
      (image) => image.is_primary
    )?.image_url ||
    product.images?.[0]?.image_url;

  const image = imagePath || productPlaceholder;

  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  const discountPercentage =
    hasDiscount
      ? Math.round(
          (
            (Number(product.price) -
              Number(
                product.discount_price
              )) /
            Number(product.price)
          ) *
            100
        )
      : 0;

  const rating =
    Number(
      product.average_rating
    ) || 0;

  const reviews =
    Number(
      product.total_reviews
    ) || 0;

  const finalPrice =
    Number(
      product.discount_price ||
      product.price
    );

  const originalPrice =
    Number(product.price);

  const handleWishlist = (
    event
  ) => {

    event.preventDefault();

    event.stopPropagation();

    toast.info(
      "Wishlist feature coming soon."
    );

  };

  const handleAddToCart =
    async (event) => {

      event.preventDefault();

      event.stopPropagation();

      if (
        !product.is_available
      ) {
        return;
      }

      try {

        await addItem({

          product_id:
            product.id,

          quantity: 1,

        });

        toast.success(
          `${product.name} added to cart`
        );

      } catch (error) {

        toast.error(
          error?.message ||
          "Unable to add product."
        );

      }

    };

  const handleIncrease = async (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (!cartItem || updating) {
      return;
    }

    if (cartItem.quantity >= MAX_QUANTITY) {
      return;
    }

    try {

      await updateItem(
        cartItem.id,
        cartItem.quantity + 1
      );

    } catch (error) {

      toast.error(
        error?.message ||
        "Unable to update quantity."
      );

    }

  };

  const handleDecrease = async (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (!cartItem || updating) {
      return;
    }

    try {

      if (cartItem.quantity > 1) {

        await updateItem(
          cartItem.id,
          cartItem.quantity - 1
        );

      } else {

        await removeItem(cartItem.id);

      }

    } catch (error) {

      toast.error(
        error?.message ||
        "Unable to update quantity."
      );

    }

  };

  return (

    <Link
      to={`/products/${product.id}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-orange-100
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-orange-300
        hover:shadow-2xl
        lg:rounded-[28px]
      "
    >

      {/* =============================== */}
      {/* Image */}
      {/* =============================== */}

      <div className="relative aspect-square overflow-hidden bg-orange-50">

        <img
          loading="lazy"
          src={image}
          alt={product.name}
          onError={(event) => {

            event.currentTarget.onerror = null;

            event.currentTarget.src =
              productPlaceholder;

          }}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <button
          type="button"
          onClick={handleWishlist}
          className="
            absolute
            right-2
            top-2
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-lg
            transition
            hover:scale-110
            lg:right-4
            lg:top-4
            lg:h-11
            lg:w-11
          "
        >

          <Heart
            className="h-4 w-4 lg:h-[18px] lg:w-[18px]"
          />

        </button>

        <div className="absolute left-2 top-2 flex flex-col gap-1 lg:left-4 lg:top-4 lg:gap-2">

          {product.is_best_seller && (

            <ProductBadge
              text="🔥 Bestseller"
              color="red"
            />

          )}

          {product.is_featured && (

            <ProductBadge
              text="⭐ Featured"
              color="orange"
            />

          )}

          {hasDiscount && (

            <ProductBadge
              text={`${discountPercentage}% OFF`}
              color="green"
            />

          )}

        </div>

        {!product.is_available && (

          <div className="absolute inset-0 flex items-center justify-center bg-black/45">

            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold lg:px-5 lg:py-2 lg:text-base">

              Out of Stock

            </span>

          </div>

        )}

      </div>

      {/* =============================== */}
      {/* Content */}
      {/* =============================== */}

      <div className="space-y-2 p-3 lg:space-y-4 lg:p-6">

        <div className="flex items-start justify-between gap-3 lg:gap-4">

          <div className="min-w-0">

            <h3 className="line-clamp-1 text-sm font-bold text-gray-900 lg:text-xl">

              {product.name}

            </h3>

            <p className="mt-0.5 text-xs font-medium text-orange-500 lg:mt-1 lg:text-sm">

              {product.category?.name}

            </p>

          </div>

          {product.is_veg ? (

            <div className="shrink-0 rounded-md border border-green-600 p-0.5 lg:rounded-lg lg:border-2 lg:p-1">

              <div className="h-2 w-2 rounded-full bg-green-600 lg:h-3 lg:w-3" />

            </div>

          ) : (

            <div className="shrink-0 rounded-md border border-red-600 p-0.5 lg:rounded-lg lg:border-2 lg:p-1">

              <div className="h-2 w-2 rounded-full bg-red-600 lg:h-3 lg:w-3" />

            </div>

          )}

        </div>

        <p className="line-clamp-2 text-xs leading-5 text-gray-500 lg:text-sm lg:leading-6">

          {product.description}

        </p>

        <div className="flex items-center justify-between">

          <ProductRating
            rating={rating}
            reviews={reviews}
          />

          <div className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 lg:px-3 lg:py-1">

            <Clock
              className="h-3 w-3 text-orange-500 lg:h-3.5 lg:w-3.5"
            />

            <span className="text-[10px] font-semibold lg:text-xs">

              {product.prep_time} mins

            </span>

          </div>

        </div>

        <div className="flex items-center justify-between gap-2">

          <div>

            <div className="text-base font-extrabold text-gray-900 lg:text-2xl">

              ₹{finalPrice}

            </div>

            {hasDiscount && (

              <div className="text-xs text-gray-400 line-through lg:text-sm">

                ₹{originalPrice}

              </div>

            )}

          </div>

          {/* ================================= */}
          {/* Add button OR +/- Stepper          */}
          {/* ================================= */}

          {cartItem ? (

            <div
              className="
                flex
                shrink-0
                items-center
                overflow-hidden
                rounded-xl
                border
                border-orange-200
                lg:rounded-2xl
              "
            >

              <button
                type="button"
                onClick={handleDecrease}
                disabled={updating}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  text-orange-600
                  transition
                  hover:bg-orange-50
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  lg:h-11
                  lg:w-11
                "
              >

                <Minus className="h-3.5 w-3.5 lg:h-[18px] lg:w-[18px]" />

              </button>

              <div
                className="
                  flex
                  h-8
                  min-w-[26px]
                  items-center
                  justify-center
                  bg-orange-50
                  text-xs
                  font-bold
                  text-gray-900
                  lg:h-11
                  lg:min-w-[40px]
                  lg:text-base
                "
              >

                {cartItem.quantity}

              </div>

              <button
                type="button"
                onClick={handleIncrease}
                disabled={
                  updating ||
                  cartItem.quantity >= MAX_QUANTITY
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  bg-orange-500
                  text-white
                  transition
                  hover:bg-orange-600
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  lg:h-11
                  lg:w-11
                "
              >

                <Plus className="h-3.5 w-3.5 lg:h-[18px] lg:w-[18px]" />

              </button>

            </div>

          ) : (

            <button
              type="button"
              disabled={!product.is_available}
              onClick={handleAddToCart}
              className={`
                shrink-0
                rounded-xl
                px-3
                py-2
                text-xs
                font-semibold
                transition-all
                lg:rounded-2xl
                lg:px-6
                lg:py-3
                lg:text-base
                ${
                  product.is_available
                    ? "bg-orange-500 text-white hover:scale-105 hover:bg-orange-600"
                    : "cursor-not-allowed bg-gray-300 text-white"
                }
              `}
            >

              {product.is_available
                ? "Add +"
                : "Unavailable"}

            </button>

          )}

        </div>

      </div>

    </Link>

  );
};
export default ProductCard;