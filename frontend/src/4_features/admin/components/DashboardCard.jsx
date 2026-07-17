import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon,

  color = "orange",

  subtitle = "Overall",

  trend,

  onClick,
}) => {
  const colors = {
    orange: {
      icon: "bg-orange-100 text-orange-600",
      badge: "text-orange-600",
    },

    green: {
      icon: "bg-green-100 text-green-600",
      badge: "text-green-600",
    },

    blue: {
      icon: "bg-blue-100 text-blue-600",
      badge: "text-blue-600",
    },

    purple: {
      icon: "bg-purple-100 text-purple-600",
      badge: "text-purple-600",
    },

    yellow: {
      icon: "bg-amber-100 text-amber-600",
      badge: "text-amber-600",
    },

    teal: {
      icon: "bg-teal-100 text-teal-600",
      badge: "text-teal-600",
    },

    red: {
      icon: "bg-red-100 text-red-600",
      badge: "text-red-600",
    },
  };

  const theme =
    colors[color] || colors.orange;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "group",
        "rounded-3xl",
        "border border-orange-100",
        "bg-white",
        "p-5",
        "shadow-sm",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-xl",
        onClick && "cursor-pointer"
      )}
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">

            {title}

          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-black
              tracking-tight
              text-gray-900
              sm:text-4xl
            "
          >
            {value ?? 0}
          </h2>

        </div>

        <div
          className={clsx(
            "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110",
            theme.icon
          )}
        >
          {icon}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-400">

            {subtitle}

          </p>

          {trend && (

            <p
              className={clsx(
                "mt-1 text-sm font-semibold",
                theme.badge
              )}
            >

              {trend}

            </p>

          )}

        </div>

        <ArrowUpRight
          size={18}
          className="
            text-gray-400
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
            group-hover:text-orange-500
          "
        />

      </div>

    </div>
  );
};

export default DashboardCard;