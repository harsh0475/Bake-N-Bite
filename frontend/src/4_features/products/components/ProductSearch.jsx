import { Search } from "lucide-react";

const ProductSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search delicious food..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10
          w-full
          rounded-lg
          border
          border-orange-200
          bg-white
          pl-10
          pr-3
          text-sm
          outline-none
          transition

          hover:border-orange-300

          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-100

          md:h-11
        "
      />
    </div>
  );
};

export default ProductSearch;