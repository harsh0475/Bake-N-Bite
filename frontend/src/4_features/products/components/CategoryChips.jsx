import { Link, useSearchParams } from "react-router-dom";
import {
  Grid2X2,
} from "lucide-react";

const CategoryChips = ({
  categories = [],
}) => {

  const [searchParams] =
    useSearchParams();

  const selected =
    searchParams.get("category");

  return (

    <div className="sticky top-20 z-20 -mx-4 mb-10 border-y border-orange-100 bg-white/95 px-4 py-4 backdrop-blur">

      <div className="scrollbar-hide flex gap-3 overflow-x-auto">

        <Link
          to="/products"
          className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
            !selected
              ? "bg-orange-500 text-white shadow-lg"
              : "bg-orange-50 text-gray-700 hover:bg-orange-100"
          }`}
        >
          <Grid2X2 size={16} />
          All
        </Link>

        {categories.map((category) => (

          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              selected === String(category.id)
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-orange-50 text-gray-700 hover:bg-orange-100"
            }`}
          >
            {category.name}
          </Link>

        ))}

      </div>

    </div>

  );

};

export default CategoryChips;