import { useEffect } from "react";

import {
  Leaf,
  Package,
  Star,
  Tag,
  ArrowUpDown,
} from "lucide-react";

import useCategories from "../../categories/hooks/useCategories";

const selectClass =
  `
    w-full
    rounded-2xl
    border
    border-orange-200
    bg-orange-50/40
    py-3.5
    pl-11
    pr-4
    text-sm
    text-gray-700
    shadow-sm
    outline-none
    transition-all

    hover:border-orange-300

    focus:border-orange-500
    focus:bg-white
    focus:ring-4
    focus:ring-orange-100

    sm:text-base
  `;

const ProductFilters = ({
  category,
  availability,
  featured,
  bestSeller,
  veg,
  sort,

  onCategoryChange,
  onAvailabilityChange,
  onFeaturedChange,
  onBestSellerChange,
  onVegChange,
  onSortChange,
}) => {

  const {
    categories,
    fetchCategories,
  } = useCategories();

  useEffect(() => {

    fetchCategories();

  }, [fetchCategories]);

  return (

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

      {/* Category */}

      <div className="relative">

        <Tag
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
        />

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
          className={selectClass}
        >

          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (

            <option
              key={cat.id}
              value={cat.id}
            >

              {cat.name}

            </option>

          ))}

        </select>

      </div>

      {/* Veg */}

      <div className="relative">

        <Leaf
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
        />

        <select
          value={veg}
          onChange={(event) =>
            onVegChange(event.target.value)
          }
          className={selectClass}
        >

          <option value="">
            All Food
          </option>

          <option value="true">
            Vegetarian
          </option>

          <option value="false">
            Non Vegetarian
          </option>

        </select>

      </div>

      {/* Availability */}

      <div className="relative">

        <Package
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
        />

        <select
          value={availability}
          onChange={(event) =>
            onAvailabilityChange(event.target.value)
          }
          className={selectClass}
        >

          <option value="">
            Availability
          </option>

          <option value="true">
            Available
          </option>

          <option value="false">
            Out of Stock
          </option>

        </select>

      </div>

      {/* Featured */}

      <div className="relative">

        <Star
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500"
        />

        <select
          value={featured}
          onChange={(event) =>
            onFeaturedChange(event.target.value)
          }
          className={selectClass}
        >

          <option value="">
            Featured
          </option>

          <option value="true">
            Featured
          </option>

          <option value="false">
            Normal
          </option>

        </select>

      </div>

      {/* Bestseller */}

      <div className="relative">

        <Star
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
        />

        <select
          value={bestSeller}
          onChange={(event) =>
            onBestSellerChange(event.target.value)
          }
          className={selectClass}
        >

          <option value="">
            Bestseller
          </option>

          <option value="true">
            Bestseller
          </option>

          <option value="false">
            Normal
          </option>

        </select>

      </div>

      {/* Sort */}

      <div className="relative">

        <ArrowUpDown
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500"
        />

        <select
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
          className={selectClass}
        >

          <option value="">
            Display Order
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="name">
            Name (A-Z)
          </option>

          <option value="price_low">
            Price: Low → High
          </option>

          <option value="price_high">
            Price: High → Low
          </option>

        </select>

      </div>

    </div>

  );

};

export default ProductFilters;
