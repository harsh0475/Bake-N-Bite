// src/4_features/home/components/TestimonialCard.jsx
import {
  BadgeCheck,
  Star,
} from "lucide-react";

const TestimonialCard = ({
  name,
  review,
  rating,
}) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        rounded-[28px]
        border
        border-orange-100
        bg-white
        p-8

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* User */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-orange-500
            text-lg
            font-bold
            text-white
          "
        >
          {initials}
        </div>

        <div>
          <h3 className="font-black text-gray-900">
            {name}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
            <BadgeCheck size={15} />
            Verified Customer
          </div>
        </div>
      </div>

      {/* Rating */}

      <div className="mt-6 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* Review */}

      <p className="mt-6 leading-8 text-gray-600">
        "{review}"
      </p>
    </div>
  );
};

export default TestimonialCard;