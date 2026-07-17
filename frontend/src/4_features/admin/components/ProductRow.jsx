import { Link } from "react-router-dom";

import {
  Edit,
  Trash2,
  Star,
  Clock3,
  Leaf,
  Beef,
  Flame,
  BadgeCheck,
} from "lucide-react";

import productPlaceholder from "../../../2_assets/images/product-placeholder.png";

import { getImageUrl } from "../../../9_utils/image";

const ProductRow = ({
  product,
  onDelete,
  mobile = false,
}) => {

  const primaryImage =
    product.images?.find(
      (image) => image.is_primary
    ) ||
    product.images?.[0];

  const imageUrl =
    getImageUrl(
      primaryImage?.image_url
    ) || productPlaceholder;

  const hasDiscount =
    product.discount_price !== null &&
    product.discount_price !== undefined &&
    Number(product.discount_price) <
      Number(product.price);

  const sellingPrice = Number(
    product.price
  );

  const finalPrice = hasDiscount
    ? Number(product.discount_price)
    : sellingPrice;

  const discount =
    hasDiscount
      ? Math.round(
          ((sellingPrice - finalPrice) /
            sellingPrice) *
            100
        )
      : 0;

  const averageRating =
    Number(
      product.average_rating || 0
    );

  if (mobile) {

    return (

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-orange-100
          bg-white
          shadow-md
          transition-all

          hover:-translate-y-1
          hover:shadow-lg
        "
      >

        {/* ====================================================== */}
        {/* Image */}
        {/* ====================================================== */}

        <div className="relative">

          <img
            src={imageUrl}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src =
                productPlaceholder;
            }}
            className="
              h-24
              w-full
              object-cover

              sm:h-32
            "
          />

          {hasDiscount && (

            <div
              className="
                absolute
                left-1.5
                top-1.5
                rounded-full
                bg-green-600
                px-1.5
                py-0.5
                text-[9px]
                font-bold
                leading-none
                text-white
                shadow
              "
            >

              {discount}% OFF

            </div>

          )}

          {product.is_featured && (

            <div
              className="
                absolute
                right-1.5
                top-1.5
                rounded-full
                bg-yellow-400
                p-1
                text-white
              "
            >

              <Star
                size={11}
                className="fill-white"
              />

            </div>

          )}

        </div>

        {/* ====================================================== */}
        {/* Body */}
        {/* ====================================================== */}

        <div className="space-y-2.5 p-2.5">

          <div>

            <h2
              className="
                line-clamp-2
                text-xs
                font-black
                leading-tight
                text-gray-900

                sm:text-sm
              "
            >

              {product.name}

            </h2>

            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                text-gray-500
              "
            >

              /{product.slug}

            </p>

          </div>

          <div className="flex flex-wrap gap-1">

            <span
              className="
                rounded-full
                bg-orange-100
                px-2
                py-0.5
                text-[9px]
                font-semibold
                text-orange-700
              "
            >

              {product.category?.name ??
                "No Category"}

            </span>

            <span
              className={`
                inline-flex
                items-center
                gap-0.5
                rounded-full
                px-2
                py-0.5
                text-[9px]
                font-semibold
                ${
                  product.is_veg
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >

              {product.is_veg
                ? <Leaf size={10}/>
                : <Beef size={10}/>}

              {product.is_veg
                ? "Veg"
                : "Non Veg"}

            </span>

            {product.spice_level !==
              "None" && (

              <span
                className="
                  inline-flex
                  items-center
                  gap-0.5
                  rounded-full
                  bg-red-100
                  px-2
                  py-0.5
                  text-[9px]
                  font-semibold
                  text-red-700
                "
              >

                <Flame size={10}/>

                {product.spice_level}

              </span>

            )}

            {product.is_best_seller && (

              <span
                className="
                  rounded-full
                  bg-orange-500
                  px-2
                  py-0.5
                  text-[9px]
                  font-bold
                  text-white
                "
              >

                Bestseller

              </span>

            )}

          </div>

          {/* ====================================================== */}
          {/* Pricing */}
          {/* ====================================================== */}

          <div className="space-y-1.5 rounded-xl bg-orange-50 p-2">

            <div>

              {hasDiscount ? (

                <div className="flex flex-wrap items-baseline gap-1.5">

                  <h2 className="text-base font-black text-orange-600 sm:text-lg">

                    ₹{finalPrice.toFixed(2)}

                  </h2>

                  <p className="text-[10px] text-gray-400 line-through">

                    ₹{sellingPrice.toFixed(2)}

                  </p>

                </div>

              ) : (

                <h2 className="text-base font-black text-gray-900 sm:text-lg">

                  ₹{sellingPrice.toFixed(2)}

                </h2>

              )}

            </div>

            <span
              className={`
                inline-flex
                rounded-full
                px-2
                py-0.5
                text-[9px]
                font-semibold
                ${
                  product.is_available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >

              {product.is_available
                ? "Available"
                : "Unavailable"}

            </span>

          </div>

          {/* ====================================================== */}
          {/* Rating / Prep */}
          {/* ====================================================== */}

          <div className="grid grid-cols-2 gap-1.5">

            <div className="min-w-0 rounded-xl border border-orange-100 bg-white p-1.5">

              <p className="truncate text-[8px] font-semibold uppercase tracking-wide text-gray-500">

                Rating

              </p>

              {product.total_reviews > 0 ? (

                <div className="mt-1 flex items-center gap-1">

                  <Star
                    size={12}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-xs font-bold">

                    {averageRating.toFixed(1)}

                  </span>

                </div>

              ) : (

                <p className="mt-1 truncate text-[9px] text-gray-400">

                  No Reviews

                </p>

              )}

            </div>

            <div className="min-w-0 rounded-xl border border-orange-100 bg-white p-1.5">

              <p className="truncate text-[8px] font-semibold uppercase tracking-wide text-gray-500">

                Preparation

              </p>

              <div className="mt-1 flex min-w-0 items-center gap-1">

                <Clock3
                  size={12}
                  className="shrink-0 text-orange-500"
                />

                <span className="truncate text-xs font-semibold">

                  {product.prep_time} mins

                </span>

              </div>

            </div>

          </div>

          {/* ====================================================== */}
          {/* Footer */}
          {/* ====================================================== */}

          <div className="flex justify-center gap-2">

            <Link
              to={`/admin/categories/${product.id}/edit`}
              aria-label="Edit"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl bg-orange-500 text-white
                transition hover:bg-orange-600
              "
            >
              <Edit size={16} />
            </Link>

            <button
              type="button"
              onClick={() => onDelete(product)}
              aria-label="Delete"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl bg-red-500 text-white
                transition hover:bg-red-600
              "
            >
              <Trash2 size={16} />
            </button>

          </div>

        </div>

      </div>

    );

  }


  return (

    <tr
      className="
        border-b
        border-orange-50
        transition-all

        hover:bg-orange-50/60
      "
    >

      {/* ====================================================== */}
      {/* Product */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="flex items-start gap-5">

          <div
            className="
              relative
              h-24
              w-24
              overflow-hidden
              rounded-2xl
              border
              border-orange-100
              bg-orange-50
            "
          >

            <img
              src={imageUrl}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src =
                  productPlaceholder;
              }}
              className="
                h-full
                w-full
                object-cover
              "
            />

            {product.is_featured && (

              <div
                className="
                  absolute
                  right-1
                  top-1
                  rounded-full
                  bg-yellow-400
                  p-1
                "
              >

                <Star
                  size={12}
                  className="fill-white text-white"
                />

              </div>

            )}

          </div>

          <div className="min-w-0">

            <h3 className="truncate text-xl font-black text-gray-900">

              {product.name}

            </h3>

            <p className="mt-1 text-sm text-gray-500">

              /{product.slug}

            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">

                {product.category?.name ?? "No Category"}

              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  product.is_veg
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                {product.is_veg ? (
                  <Leaf size={12} />
                ) : (
                  <Beef size={12} />
                )}

                {product.is_veg ? "Veg" : "Non Veg"}

              </span>

              {product.spice_level !== "None" && (

                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                  <Flame size={12} />

                  {product.spice_level}

                </span>

              )}

              {product.is_best_seller && (

                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">

                  Bestseller

                </span>

              )}

            </div>

          </div>

        </div>

      </td>

      {/* ====================================================== */}
      {/* Category */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <span className="font-semibold text-gray-700">

          {product.category?.name ?? "-"}

        </span>

      </td>

      {/* ====================================================== */}
      {/* Price */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        {hasDiscount ? (

          <div>

            <h3 className="text-2xl font-black text-orange-600">

              ₹{finalPrice.toFixed(2)}

            </h3>

            <p className="text-sm text-gray-400 line-through">

              ₹{sellingPrice.toFixed(2)}

            </p>

            <span className="mt-2 inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">

              {discount}% OFF

            </span>

          </div>

        ) : (

          <h3 className="text-2xl font-black text-gray-900">

            ₹{sellingPrice.toFixed(2)}

          </h3>

        )}

      </td>

      {/* ====================================================== */}
      {/* Rating */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        {product.total_reviews > 0 ? (

          <div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-3 py-2">

              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-bold">

                {averageRating.toFixed(1)}

              </span>

            </div>

            <p className="mt-2 text-xs text-gray-500">

              {product.total_reviews} Reviews

            </p>

          </div>

        ) : (

          <span className="text-sm text-gray-400">

            No Reviews

          </span>

        )}

      </td>

      {/* ====================================================== */}
      {/* Availability */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="space-y-3">

          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
              product.is_available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >

            <BadgeCheck size={15} />

            {product.is_available
              ? "Available"
              : "Unavailable"}

          </span>

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Clock3 size={15} />

            {product.prep_time} mins

          </div>

        </div>

      </td>

      {/* ====================================================== */}
      {/* Actions */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="flex justify-end gap-3">

          <Link
            to={`/admin/products/${product.id}/edit`}
            className="
              rounded-2xl
              bg-orange-100
              p-3
              text-orange-600
              transition-all

              hover:bg-orange-500
              hover:text-white
            "
          >

            <Edit size={18} />

          </Link>

          <button
            type="button"
            onClick={() =>
              onDelete(product)
            }
            className="
              rounded-2xl
              bg-red-100
              p-3
              text-red-600
              transition-all

              hover:bg-red-500
              hover:text-white
            "
          >

            <Trash2 size={18} />

          </button>

        </div>

      </td>

    </tr>

  );

};

export default ProductRow;