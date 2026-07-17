import clsx from "clsx";
import Container from "./Container";

const PageHeader = ({
  title,
  subtitle,

  badge,

  align = "left",

  action,

  className,
}) => {

  const alignment = {
    left: "items-start text-left",

    center: "items-center text-center",

    right: "items-end text-right",
  };

  return (
    <section className={clsx("pb-8 pt-2", className)}>

      <Container>

        <div
          className={clsx(
            "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
            align === "center" && "lg:flex-col lg:items-center"
          )}
        >

          <div
            className={clsx(
              "flex flex-col",
              alignment[align]
            )}
          >

            {badge && (

              <span
                className="
                  mb-4
                  inline-flex
                  w-fit
                  items-center
                  rounded-full
                  border
                  border-orange-200
                  bg-orange-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-orange-600
                "
              >

                {badge}

              </span>

            )}

            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >

              {title}

            </h1>

            {subtitle && (

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-base
                  leading-7
                  text-gray-500
                  sm:text-lg
                "
              >

                {subtitle}

              </p>

            )}

          </div>

          {action && (

            <div className="shrink-0">

              {action}

            </div>

          )}

        </div>

      </Container>

    </section>
  );

};

export default PageHeader;