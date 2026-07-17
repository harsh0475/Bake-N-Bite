import {
  LayoutGrid,
  ArrowUpDown,
  Package,
} from "lucide-react";

const ProductDisplaySettings = ({
  register,
  errors,
}) => {
  return (
    <div className="space-y-10">

      {/* ====================================================== */}
      {/* Display Order */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-start gap-5">

          <div className="rounded-2xl bg-orange-100 p-4">

            <LayoutGrid
              size={30}
              className="text-orange-500"
            />

          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-900">

              Product Position

            </h3>

            <p className="mt-2 text-gray-500">

              Products with lower display order appear
              before products with higher values.

            </p>

          </div>

        </div>

        <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700">

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
          onWheel={(event) => event.currentTarget.blur()}
          {...register("display_order", {
            valueAsNumber: true,
          })}
          className="
            w-full
            rounded-2xl
            border
            border-gray-300
            bg-white
            px-5
            py-4
            outline-none
            transition

            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        />

        <p className="mt-3 text-sm text-gray-500">

          Example: Products with display order 1 will
          appear before products with display order 5.

        </p>

        {errors.display_order && (

          <p className="mt-2 text-sm text-red-500">

            {errors.display_order.message}

          </p>

        )}

      </div>

      {/* ====================================================== */}
      {/* Future Inventory */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border-2 border-dashed border-orange-200 bg-orange-50 p-8">

        <div className="flex items-start gap-5">

          <div className="rounded-2xl bg-orange-100 p-4">

            <Package
              size={30}
              className="text-orange-500"
            />

          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-900">

              Future Inventory Module

            </h3>

            <p className="mt-4 leading-8 text-gray-600">

              Inventory management will be integrated in
              a future release to help manage products
              more efficiently.

            </p>

            <ul className="mt-5 list-disc space-y-2 pl-6 text-gray-600">

              <li>SKU & Barcode Management</li>

              <li>Stock Quantity Tracking</li>

              <li>Low Stock Alerts</li>

              <li>Automatic Out of Stock Detection</li>

              <li>Inventory History</li>

              <li>Purchase Tracking</li>

              <li>Supplier Management</li>

              <li>Stock Movement Reports</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDisplaySettings;