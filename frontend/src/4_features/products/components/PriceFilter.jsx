const PriceFilter = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        h-10
        rounded-lg
        border
        border-orange-200
        bg-white
        px-3
        text-sm
        font-medium
        text-gray-700
        outline-none
        transition-all
        duration-200
        hover:border-orange-300
        focus:border-orange-500
        focus:ring-2
        focus:ring-orange-100

        md:h-11
        md:px-4
        md:text-sm
      "
    >
      <option value="">
        All Prices
      </option>

      <option value="0-100">
        ₹0 - ₹100
      </option>

      <option value="100-250">
        ₹100 - ₹250
      </option>

      <option value="250-500">
        ₹250 - ₹500
      </option>

      <option value="500+">
        ₹500+
      </option>
    </select>
  );
};

export default PriceFilter;