import {
  LayoutGrid,
  ArrowUpDown,
  FolderTree,
} from "lucide-react";

const CategoryDisplaySettings = ({
  register,
  errors,
}) => {
  return (
    <div className="space-y-8 lg:space-y-10">

      {/* ====================================================== */}
      {/* Display Order */}
      {/* ====================================================== */}

      <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-lg sm:p-6 lg:p-8">

        <div className="mb-6 flex items-start gap-4">

          <div className="rounded-2xl bg-orange-100 p-3 sm:p-4">

            <LayoutGrid
              size={28}
              className="text-orange-500"
            />

          </div>

          <div>

            <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">

              Category Position

            </h3>

            <p className="mt-1 text-sm text-gray-500 lg:text-base">

              Lower numbers appear before higher numbers.

            </p>

          </div>

        </div>

        <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 lg:text-base">

          <ArrowUpDown
            size={18}
            className="text-orange-500"
          />

          Display Order

        </label>

        <input
          type="number"
          min={0}
          placeholder="0"
          {...register("display_order", {
            valueAsNumber: true,
          })}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:px-5 sm:py-4"
        />

        {errors.display_order && (

          <p className="mt-2 text-sm text-red-500">

            {errors.display_order.message}

          </p>

        )}

      </div>

      {/* ====================================================== */}
      {/* Future Improvements */}
      {/* ====================================================== */}

      <div className="rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50 p-5 sm:p-6 lg:p-8">

        <div className="flex flex-col gap-5 sm:flex-row">

          <div className="w-fit rounded-2xl bg-orange-100 p-3 sm:p-4">

            <FolderTree
              size={28}
              className="text-orange-500"
            />

          </div>

          <div className="flex-1">

            <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">

              Future Improvements

            </h3>

            <p className="mt-4 leading-7 text-gray-600">

              More category customization options will be added
              in future versions.

            </p>

            <ul className="mt-5 list-disc space-y-2 pl-6 text-gray-600">

              <li>Category Banner</li>

              <li>SEO Meta Information</li>

              <li>Homepage Priority</li>

              <li>Offer Banner</li>

              <li>Category Icons</li>

              <li>Category Analytics</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CategoryDisplaySettings;