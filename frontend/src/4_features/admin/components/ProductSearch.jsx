import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  X,
} from "lucide-react";

const ProductSearch = ({
  value,
  onChange,
}) => {

  const [search, setSearch] =
    useState(value);

  // ======================================================
  // Sync
  // ======================================================

  useEffect(() => {

    setSearch(value);

  }, [value]);

  // ======================================================
  // Debounce
  // ======================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      onChange(search.trim());

    }, 350);

    return () => clearTimeout(timer);

  }, [
    search,
    onChange,
  ]);

  // ======================================================
  // Clear
  // ======================================================

  const clearSearch = () => {

    setSearch("");

  };

  return (

    <div className="relative">

      <Search
        size={22}
        className="
          pointer-events-none
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-orange-400
        "
      />

      <input
        type="text"
        value={search}
        placeholder="Search products by name or slug..."
        onChange={(event) =>
          setSearch(event.target.value)
        }
        className="
          w-full
          rounded-2xl
          border
          border-orange-200
          bg-orange-50/40
          py-4
          pl-14
          pr-14
          text-[15px]
          text-gray-800
          shadow-sm
          transition-all

          placeholder:text-gray-400

          hover:border-orange-300

          focus:border-orange-500
          focus:bg-white
          focus:outline-none
          focus:ring-4
          focus:ring-orange-100

          sm:text-base
        "
      />

      {search && (

        <button
          type="button"
          onClick={clearSearch}
          title="Clear Search"
          className="
            absolute
            right-4
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition-all

            hover:bg-orange-100
            hover:text-orange-600
          "
        >

          <X size={18} />

        </button>

      )}

    </div>

  );

};

export default ProductSearch;