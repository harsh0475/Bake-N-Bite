import { Link } from "react-router-dom";

const PromoBanner = ({
  badge,
  title,
  description,

  stats = [],

  buttonText,
  buttonTo,

  children,

  className = "",
}) => {
  return (
    <section
      className={`
        relative
        overflow-hidden

        rounded-[38px]

        bg-gradient-to-r
        from-orange-500
        via-orange-400
        to-amber-400

        shadow-2xl

        ${className}
      `}
    >
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
      <div className="absolute bottom-0 right-24 h-52 w-52 rounded-full bg-white/10" />
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />

      <div
        className="
          relative
          z-10

          flex
          flex-col
          gap-8

          p-6

          sm:p-8

          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:p-12
        "
      >
        <div className="max-w-3xl">
          {badge && (
            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-white/20
                px-4
                py-2
                text-xs
                font-bold
                tracking-wide
                text-white
                backdrop-blur
                sm:text-sm
              "
            >
              {badge}
            </span>
          )}

          <h1
            className="
              mt-5
              text-3xl
              font-black
              leading-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            {title}
          </h1>

          {description && (
            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-orange-50
                sm:text-base
                lg:text-lg
              "
            >
              {description}
            </p>
          )}

          {buttonText && buttonTo && (
            <Link
              to={buttonTo}
              className="
                mt-8
                inline-flex
                items-center
                gap-3

                rounded-2xl

                bg-white

                px-8
                py-4

                font-bold
                text-orange-600

                shadow-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-orange-50
                hover:shadow-2xl
              "
            >
              {buttonText}
            </Link>
          )}
        </div>

        {(stats.length > 0 || children) && (
          <div
            className="
              flex
              w-full
              flex-col
              gap-5

              lg:w-auto
              lg:items-end
            "
          >
          

            {stats.length > 0 && (
              <div className="flex flex-wrap justify-end gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="
                      min-w-[92px]

                      rounded-2xl

                      bg-white/20

                      p-4

                      text-center

                      backdrop-blur

                      sm:min-w-[130px]
                      sm:rounded-3xl
                      sm:p-5
                    "
                  >
                    <div className="text-xl font-black text-white sm:text-3xl">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-xs text-orange-100 sm:mt-2 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoBanner;