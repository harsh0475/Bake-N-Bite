import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroButtons = ({
  buttons = [],
}) => {
  if (buttons.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">

      {buttons.map((button, index) => {

        const {
          label,
          to,
          icon: Icon,
          variant = "primary",
          onClick,
        } = button;

        const classes =
          variant === "secondary"
            ? `
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border-2
                border-orange-500
                bg-white/70
                px-8
                py-4
                font-semibold
                text-orange-600
                backdrop-blur
                transition
                duration-300
                hover:bg-orange-50
              `
            : `
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-orange-500
                px-8
                py-4
                font-semibold
                text-white
                shadow-xl
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-orange-600
              `;

        if (to) {
          return (
            <Link
              key={index}
              to={to}
              className={classes}
            >
              {label}

              {Icon ? (
                <Icon size={20} />
              ) : (
                variant === "primary" && (
                  <ArrowRight size={20} />
                )
              )}
            </Link>
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={onClick}
            className={classes}
          >
            {label}

            {Icon ? (
              <Icon size={20} />
            ) : (
              variant === "primary" && (
                <ArrowRight size={20} />
              )
            )}
          </button>
        );

      })}

    </div>
  );
};

export default HeroButtons;