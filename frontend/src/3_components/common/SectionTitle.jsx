import clsx from "clsx";

const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}) => {
  const alignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div
      className={clsx(
        "mb-6 flex flex-col lg:mb-8",
        alignment[align],
        className
      )}
    >
      {badge && (
        <span
          className="
            mb-2
            inline-flex
            w-fit
            items-center
            rounded-full
            border
            border-orange-200
            bg-orange-50
            px-3
            py-1
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            text-orange-600

            sm:px-4
            sm:py-1.5
            sm:text-xs
          "
        >
          {badge}
        </span>
      )}

      <h2
        className="
          text-2xl
          font-extrabold
          leading-tight
          tracking-tight
          text-gray-900

          sm:text-3xl
          lg:text-[34px]
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-gray-500

            sm:mt-3
            sm:text-base
            sm:leading-7
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;