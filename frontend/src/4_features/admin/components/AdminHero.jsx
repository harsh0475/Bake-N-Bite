import { Link } from "react-router-dom";

const AdminHero = ({
  badge,
  title,
  description,

  stats = [],

  buttonText,
  buttonIcon,
  buttonTo,

  children,
}) => {
  return (
    <section
      className="
        relative
        overflow-hidden

        rounded-[38px]

        bg-gradient-to-r
        from-orange-500
        via-orange-400
        to-amber-400

        shadow-2xl
      "
    >
      {/* Background */}

      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />

      <div className="absolute bottom-0 right-24 h-52 w-52 rounded-full bg-white/10" />

      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />

      {/* Content */}

      <div
        className="
          relative
          z-10

          flex
          flex-col
          gap-8

          p-5

          sm:p-8

          lg:flex-row
          lg:items-center
          lg:justify-between

          lg:p-10
        "
      >
        {/* Left */}

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

                text-orange-100

                sm:text-base

                lg:text-lg
              "
            >
              {description}
            </p>
          )}

        </div>

        {/* Right */}

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
            <div
              className="
                grid

                grid-cols-2

                gap-4

                lg:w-auto
              "
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="
                    min-w-[150px]

                    rounded-3xl

                    bg-white/20

                    p-5

                    text-center

                    backdrop-blur
                  "
                >
                  <div className="text-3xl font-black text-white">
                    {stat.value}
                  </div>

                  <div className="mt-2 text-sm text-orange-100">
                    {stat.label}
                  </div>

                </div>
              ))}
            </div>
          )}

          {buttonText && (
            <Link
              to={buttonTo}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3

                rounded-3xl

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

                lg:w-auto
              "
            >
              {buttonIcon}

              {buttonText}
            </Link>
          )}

          {children}

        </div>

      </div>
    </section>
  );
};

export default AdminHero;