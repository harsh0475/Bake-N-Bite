// src/4_features/products/components/ProductInfo.jsx
import {
  Clock3,
  Flame,
  Leaf,
  Beef,
  Star,
  Tag,
} from "lucide-react";

import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import ProductBadge from "./ProductBadge";

const ProductInfo = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* ====================================================== */}
      {/* Category + Badges */}
      {/* ====================================================== */}

      <div className="space-y-4">
        {product.category && (
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            <Tag size={16} />
            {product.category.name}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {product.is_featured && (
            <ProductBadge text="Featured" color="orange" />
          )}

          {product.is_best_seller && (
            <ProductBadge text="Best Seller" color="red" />
          )}
        </div>
      </div>

      {/* ====================================================== */}
      {/* Product Name */}
      {/* ====================================================== */}

      <div>
        <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {product.name}
        </h1>

        <ProductRating
          rating={product.average_rating}
          reviews={product.total_reviews}
        />
      </div>

      {/* ====================================================== */}
      {/* Price */}
      {/* ====================================================== */}

      <ProductPrice
        price={product.price}
        discountPrice={product.discount_price}
      />

      {/* ====================================================== */}
      {/* Description */}
      {/* ====================================================== */}

      <div>
        <h2 className="mb-3 text-xl font-black text-gray-900">
          Description
        </h2>

        <p className="leading-8 text-gray-600">
          {product.description || "No description available."}
        </p>
      </div>

      {/* ====================================================== */}
      {/* Product Information */}
      {/* ====================================================== */}

      <div>
        <h2 className="mb-5 text-xl font-black text-gray-900">
          Product Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Food Type */}

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              {product.is_veg ? (
                <Leaf className="text-green-600" size={24} />
              ) : (
                <Beef className="text-red-600" size={24} />
              )}

              <span className="font-semibold">Food Type</span>
            </div>

            <p className="text-gray-600">
              {product.is_veg ? "Vegetarian" : "Non Vegetarian"}
            </p>
          </div>

          {/* Preparation */}

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <Clock3 className="text-orange-500" size={24} />
              <span className="font-semibold">Preparation Time</span>
            </div>

            <p className="text-gray-600">{product.prep_time} Minutes</p>
          </div>

          {/* Spice */}

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <Flame className="text-red-500" size={24} />
              <span className="font-semibold">Spice Level</span>
            </div>

            <p className="text-gray-600">{product.spice_level}</p>
          </div>

          {/* Availability */}

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <Star
                size={24}
                className={
                  product.is_available ? "text-green-600" : "text-red-500"
                }
              />

              <span className="font-semibold">Availability</span>
            </div>

            <p
              className={
                product.is_available
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-500"
              }
            >
              {product.is_available ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;