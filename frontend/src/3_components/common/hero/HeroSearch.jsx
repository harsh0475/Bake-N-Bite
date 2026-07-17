// src/3_components/common/hero/HeroSearch.jsx

import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="mt-2 sm:mt-3 lg:mt-0">
      <div
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-orange-100
          bg-white/90
          p-1.5
          shadow-lg
          backdrop-blur-xl

          sm:gap-3
          sm:rounded-3xl
          sm:p-2
        "
      >
        <div className="relative min-w-0 flex-1">
          <Search
            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-orange-500

              sm:left-5
              sm:h-5
              sm:w-5
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search cakes, momos, sandwiches..."
            className="
              h-11
              w-full
              rounded-xl
              bg-transparent
              pl-10
              pr-3
              text-sm
              outline-none
              placeholder:text-gray-400

              sm:h-14
              sm:rounded-2xl
              sm:pl-14
              sm:pr-4
              sm:text-base
            "
          />
        </div>

        <button
          onClick={handleSearch}
          className="
            h-11
            flex-shrink-0
            rounded-xl
            bg-orange-500
            px-4
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-orange-600
            active:scale-95

            sm:h-14
            sm:rounded-2xl
            sm:px-8
            sm:text-base
          "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HeroSearch;