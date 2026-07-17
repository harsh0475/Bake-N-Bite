import {
  Leaf,
  Package,
} from "lucide-react";

const ProductFilters = ({
  veg,
  availability,
  onVegChange,
  onAvailabilityChange,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">

      {/* Veg */}

      <div className="relative">

        <Leaf
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
        />

        <select
          value={veg}
          onChange={(e) =>
            onVegChange(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-8 outline-none transition focus:border-orange-500 lg:w-52"
        >

          <option value="">
            All Food
          </option>

          <option value="veg">
            Vegetarian
          </option>

          <option value="nonveg">
            Non Vegetarian
          </option>

        </select>

      </div>

      {/* Availability */}

      <div className="relative">

        <Package
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
        />

        <select
          value={availability}
          onChange={(e) =>
            onAvailabilityChange(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-8 outline-none transition focus:border-orange-500 lg:w-52"
        >

          <option value="">
            All Products
          </option>

          <option value="available">
            Available
          </option>

          <option value="unavailable">
            Out Of Stock
          </option>

        </select>

      </div>

    </div>
  );
};

export default ProductFilters;