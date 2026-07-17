import clsx from "clsx";

const AdminSectionCard = ({
  title,
  description,
  actions,
  children,
  className = "",
}) => {
  return (
    <section
      className={clsx(
        `
        overflow-hidden

        rounded-[34px]

        border
        border-orange-100

        bg-white

        shadow-xl

        transition-all
        duration-300

        hover:shadow-2xl
        `,
        className
      )}
    >
      {(title || description || actions) && (
        <div
          className="
            flex
            flex-col
            gap-5

            border-b
            border-orange-100

            px-5
            py-5

            sm:px-6

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
        "
        >
          <div>

            {title && (
              <h2
                className="
                  text-2xl
                  font-black
                  text-gray-900

                  lg:text-3xl
                "
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                className="
                  mt-2

                  max-w-3xl

                  text-sm
                  leading-7
                  text-gray-500

                  lg:text-base
                "
              >
                {description}
              </p>
            )}

          </div>

          {actions && (
            <div className="shrink-0">
              {actions}
            </div>
          )}

        </div>
      )}

      <div
        className="
          p-5

          sm:p-6

          lg:p-8
        "
      >
        {children}
      </div>
    </section>
  );
};

export default AdminSectionCard;