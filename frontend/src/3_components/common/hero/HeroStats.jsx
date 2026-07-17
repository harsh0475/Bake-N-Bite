const HeroStats = ({
  stats = [],
}) => {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div
      className="
        mt-8
        grid
        grid-cols-2
        gap-4
        lg:mt-14
        lg:grid-cols-4
      "
    >
      {stats.map((item, index) => {

        const Icon = item.icon;

        return (

          <div
            key={index}
            className="
              rounded-3xl
              border
              border-orange-100
              bg-white/80
              p-5
              shadow-lg
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            {Icon && (
              <div
                className="
                  mb-4
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-orange-100
                "
              >

                <Icon
                  size={24}
                  className="text-orange-500"
                />

              </div>
            )}

            <h3
              className="
                text-3xl
                font-black
                text-gray-900
              "
            >

              {item.value}

            </h3>

            <p
              className="
                mt-2
                text-sm
                text-gray-500
              "
            >

              {item.label}

            </p>

          </div>

        );

      })}
    </div>
  );
};

export default HeroStats;