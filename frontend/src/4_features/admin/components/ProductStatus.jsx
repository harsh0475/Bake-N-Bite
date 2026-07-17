import {
  CheckCircle2,
  Star,
  Trophy,
} from "lucide-react";

const ProductStatus = ({
  register,
}) => {
  return (
    <div className="space-y-10">

      {/* ====================================================== */}
      {/* Status Cards */}
      {/* ====================================================== */}

      <div className="grid gap-8 xl:grid-cols-3">

        {/* ====================================================== */}
        {/* Available */}
        {/* ====================================================== */}

        <label className="cursor-pointer">

          <input
            type="checkbox"
            {...register("is_available")}
            className="peer hidden"
          />

          <div
            className="
              rounded-[30px]
              border-2
              border-gray-200
              bg-white
              p-8
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-green-300
              hover:shadow-xl

              peer-checked:border-green-500
              peer-checked:bg-green-50
            "
          >

            <div className="flex items-start gap-5">

              <div className="rounded-2xl bg-green-100 p-4">

                <CheckCircle2
                  size={32}
                  className="text-green-600"
                />

              </div>

              <div>

                <h3 className="text-xl font-bold text-gray-900">

                  Available

                </h3>

                <p className="mt-3 leading-7 text-gray-500">

                  Customers can purchase this product immediately.
                  Disable this option whenever the item is temporarily
                  unavailable.

                </p>

              </div>

            </div>

          </div>

        </label>

        {/* ====================================================== */}
        {/* Featured */}
        {/* ====================================================== */}

        <label className="cursor-pointer">

          <input
            type="checkbox"
            {...register("is_featured")}
            className="peer hidden"
          />

          <div
            className="
              rounded-[30px]
              border-2
              border-gray-200
              bg-white
              p-8
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-yellow-300
              hover:shadow-xl

              peer-checked:border-yellow-500
              peer-checked:bg-yellow-50
            "
          >

            <div className="flex items-start gap-5">

              <div className="rounded-2xl bg-yellow-100 p-4">

                <Star
                  size={32}
                  className="text-yellow-600"
                />

              </div>

              <div>

                <h3 className="text-xl font-bold text-gray-900">

                  Featured Product

                </h3>

                <p className="mt-3 leading-7 text-gray-500">

                  Display this product in featured sections,
                  homepage highlights and promotional collections.

                </p>

              </div>

            </div>

          </div>

        </label>

        {/* ====================================================== */}
        {/* Best Seller */}
        {/* ====================================================== */}

        <label className="cursor-pointer">

          <input
            type="checkbox"
            {...register("is_best_seller")}
            className="peer hidden"
          />

          <div
            className="
              rounded-[30px]
              border-2
              border-gray-200
              bg-white
              p-8
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-300
              hover:shadow-xl

              peer-checked:border-orange-500
              peer-checked:bg-orange-50
            "
          >

            <div className="flex items-start gap-5">

              <div className="rounded-2xl bg-orange-100 p-4">

                <Trophy
                  size={32}
                  className="text-orange-600"
                />

              </div>

              <div>

                <h3 className="text-xl font-bold text-gray-900">

                  Best Seller

                </h3>

                <p className="mt-3 leading-7 text-gray-500">

                  Highlight this item as one of the most popular
                  products to improve customer confidence and sales.

                </p>

              </div>

            </div>

          </div>

        </label>

      </div>

    </div>
  );
};

export default ProductStatus;