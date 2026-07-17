import { useMemo } from "react";
import {
  IndianRupee,
  BadgePercent,
  TrendingDown,
} from "lucide-react";

const ProductPricing = ({
  register,
  watch,
  errors,
}) => {
  const price = Number(watch("price") || 0);

  const discountPrice = Number(
    watch("discount_price") || 0
  );

  const discountPercentage = useMemo(() => {
    if (
      !price ||
      !discountPrice ||
      discountPrice >= price
    ) {
      return 0;
    }

    return Math.round(
      ((price - discountPrice) / price) * 100
    );
  }, [price, discountPrice]);

  const savings =
    price > discountPrice
      ? price - discountPrice
      : 0;

  return (
    <div className="space-y-10">

      {/* ====================================================== */}
      {/* Inputs */}
      {/* ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700">

            <IndianRupee
              size={18}
              className="text-orange-500"
            />

            Selling Price

          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="299"
            onWheel={(event) => event.currentTarget.blur()}
            {...register("price")}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-lg outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          {errors.price && (
            <p className="mt-2 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}

        </div>

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700">

            <BadgePercent
              size={18}
              className="text-green-600"
            />

            Discount Price

          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="249"
            onWheel={(event) => event.currentTarget.blur()}
            {...register("discount_price")}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-lg outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          {errors.discount_price && (
            <p className="mt-2 text-sm text-red-500">
              {errors.discount_price.message}
            </p>
          )}

        </div>

      </div>

      {/* ====================================================== */}
      {/* Live Preview */}
      {/* ====================================================== */}

      <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6">

        <h3 className="mb-6 text-xl font-bold text-gray-900">

          Live Price Preview

        </h3>

        {price > 0 ? (

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm text-gray-500">

                Selling Price

              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-900">

                ₹{price.toFixed(2)}

              </h2>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm text-gray-500">

                Customer Pays

              </p>

              <h2 className="mt-3 text-3xl font-black text-orange-500">

                ₹
                {(
                  discountPrice > 0
                    ? discountPrice
                    : price
                ).toFixed(2)}

              </h2>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm text-gray-500">

                Savings

              </p>

              <h2 className="mt-3 text-3xl font-black text-green-600">

                ₹{savings.toFixed(2)}

              </h2>

            </div>

          </div>

        ) : (

          <div className="rounded-2xl border-2 border-dashed border-orange-300 bg-white py-12 text-center">

            <TrendingDown
              size={50}
              className="mx-auto text-orange-400"
            />

            <h3 className="mt-5 text-lg font-bold text-gray-800">

              No Price Yet

            </h3>

            <p className="mt-2 text-gray-500">

              Enter a selling price to see the
              customer price preview.

            </p>

          </div>

        )}

      </div>

      {/* ====================================================== */}
      {/* Discount Summary */}
      {/* ====================================================== */}

      {price > 0 &&
        discountPrice > 0 &&
        discountPrice < price && (

        <div className="rounded-3xl border border-green-200 bg-green-50 p-6">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm text-gray-600">

                Customer Saves

              </p>

              <h2 className="mt-2 text-4xl font-black text-green-600">

                ₹{savings.toFixed(2)}

              </h2>

            </div>

            <div className="rounded-2xl bg-green-600 px-8 py-5 text-center text-white shadow-lg">

              <p className="text-sm font-medium">

                Discount

              </p>

              <h2 className="text-4xl font-black">

                {discountPercentage}%

              </h2>

              <p className="text-sm">

                OFF

              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ProductPricing;