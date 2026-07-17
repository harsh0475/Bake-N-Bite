import { Link } from "react-router-dom";

import {
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";

import {
  getImageUrl,
} from "../../../9_utils/image";

const CategoryCard = ({
  category,
}) => {

  const image =
    getImageUrl(category.image);

  return (

    <Link
      to={`/products?category=${category.id}`}
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
        border-orange-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >

      {/* Image */}

      <div className="relative aspect-[4/3] overflow-hidden">

        <img
          src={
            image ||
            "https://placehold.co/600x450/FDF2E9/F97316?text=Bake+N+Bite"
          }
          alt={category.name}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge */}

        <div className="absolute left-4 top-4">

          <span
            className="
              rounded-full
              bg-white/90
              px-4
              py-2
              text-sm
              font-semibold
              text-orange-600
              backdrop-blur
            "
          >

            Category

          </span>

        </div>

      </div>

      {/* Content */}

      <div className="space-y-5 p-6">

        <div>

          <h3 className="text-2xl font-black text-gray-900">

            {category.name}

          </h3>

          <p className="mt-3 line-clamp-2 leading-7 text-gray-500">

            {category.description}

          </p>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-2 text-orange-500">

            <UtensilsCrossed size={18} />

            <span className="font-medium">

              Fresh Homemade

            </span>

          </div>

          <ArrowRight
            className="
              transition
              duration-300
              group-hover:translate-x-2
            "
          />

        </div>

      </div>

    </Link>

  );

};

export default CategoryCard;