import { ArrowRight } from "lucide-react";

const OfferCard = ({
  icon: Icon,
  badge,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        h-full
        rounded-3xl
        border
        border-orange-100
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-200
        hover:shadow-xl

        lg:p-7
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-orange-100
          text-orange-500
          transition-all
          duration-300

          group-hover:bg-orange-500
          group-hover:text-white
        "
      >
        {Icon && <Icon size={28} />}
      </div>

      {badge && (
        <span
          className="
            mt-5
            inline-flex
            rounded-full
            bg-orange-50
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-orange-600
          "
        >
          {badge}
        </span>
      )}

      <h3
        className="
          mt-4
          text-xl
          font-black
          leading-snug
          text-gray-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-gray-500
        "
      >
        {description}
      </p>

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
          font-semibold
          text-orange-500
        "
      >
        Learn More

        <ArrowRight
          size={18}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </div>
  );
};

export default OfferCard;