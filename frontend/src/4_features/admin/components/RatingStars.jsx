import { Star } from "lucide-react";

const RatingStars = ({
  rating,
}) => {
  return (
    <div className="flex items-center gap-1">

      {[1, 2, 3, 4, 5].map((value) => (

        <Star
          key={value}
          size={16}
          className={
            value <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />

      ))}

    </div>
  );
};

export default RatingStars;