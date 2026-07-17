import {
  Flame,
  Clock3,
  Leaf,
  Beef,
} from "lucide-react";

const ProductAttributes = ({
  register,
  watch,
  setValue,
  errors,
}) => {
  return (
    <div className="space-y-8 lg:space-y-10">

      {/* ====================================================== */}
      {/* Spice + Prep Time */}
      {/* ====================================================== */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Spice Level */}

        <div>

          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 sm:text-base">

            <Flame
              size={18}
              className="text-red-500"
            />

            Spice Level

          </label>

          <select
            {...register("spice_level")}
            className="
              w-full
              rounded-2xl
              border
              border-gray-300
              bg-white
              px-5
              py-4
              text-base
              outline-none
              transition

              focus:border-orange-500
              focus:ring-4
              focus:ring-orange-100
            "
          >

            <option value="None">

              🌱 None (Not Spicy)

            </option>

            <option value="Mild">

              🌶 Mild

            </option>

            <option value="Medium">

              🌶🌶 Medium

            </option>

            <option value="Hot">

              🌶🌶🌶 Hot

            </option>

          </select>

          {errors.spice_level && (

            <p className="mt-2 text-sm text-red-500">

              {errors.spice_level.message}

            </p>

          )}

        </div>

        {/* Preparation Time */}

        <div>

          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 sm:text-base">

            <Clock3
              size={18}
              className="text-orange-500"
            />

            Preparation Time (Minutes)

          </label>

          <input
            type="number"
            min={1}
            max={600}
            placeholder="20"
            onWheel={(event) => event.currentTarget.blur()}
            {...register("prep_time", {
              valueAsNumber: true,
            })}
            className="
              w-full
              rounded-2xl
              border
              border-gray-300
              bg-white
              px-5
              py-4
              text-base
              outline-none
              transition

              focus:border-orange-500
              focus:ring-4
              focus:ring-orange-100
            "
          />

          {errors.prep_time && (

            <p className="mt-2 text-sm text-red-500">

              {errors.prep_time.message}

            </p>

          )}

        </div>

      </div>

      {/* ====================================================== */}
      {/* Food Type */}
      {/* ====================================================== */}

      <div>

        <h3 className="mb-5 text-xl font-bold text-gray-900">

          Food Type

        </h3>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Vegetarian */}

          <label className="cursor-pointer">

            <input
              type="radio"
              checked={watch("is_veg") === true}
              onChange={() =>
                setValue("is_veg", true, {
                  shouldValidate: true,
                })
              }
              className="peer hidden"
            />

            <div
              className="
                rounded-[28px]
                border-2
                border-gray-200
                bg-white
                p-6
                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-lg

                peer-checked:border-green-500
                peer-checked:bg-green-50

                lg:p-8
              "
            >

              <div className="flex items-center gap-5">

                <div className="rounded-2xl bg-green-100 p-3 sm:p-4">

                  <Leaf
                    size={30}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <h4 className="text-lg font-bold sm:text-xl">

                    Vegetarian

                  </h4>

                  <p className="mt-1 text-sm text-gray-500">

                    Suitable for vegetarian customers.

                  </p>

                </div>

              </div>

            </div>

          </label>

          {/* Non Vegetarian */}

          <label className="cursor-pointer">

            <input
              type="radio"
              checked={watch("is_veg") === false}
              onChange={() =>
                setValue("is_veg", false, {
                  shouldValidate: true,
                })
              }
              className="peer hidden"
            />

            <div
              className="
                rounded-[28px]
                border-2
                border-gray-200
                bg-white
                p-6
                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-lg

                peer-checked:border-red-500
                peer-checked:bg-red-50

                lg:p-8
              "
            >

              <div className="flex items-center gap-5">

                <div className="rounded-2xl bg-red-100 p-3 sm:p-4">

                  <Beef
                    size={30}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h4 className="text-lg font-bold sm:text-xl">

                    Non Vegetarian

                  </h4>

                  <p className="mt-1 text-sm text-gray-500">

                    Contains meat or non-vegetarian ingredients.

                  </p>

                </div>

              </div>

            </div>

          </label>

        </div>

        {errors.is_veg && (

          <p className="mt-3 text-sm text-red-500">

            {errors.is_veg.message}

          </p>

        )}

      </div>

    </div>
  );
};

export default ProductAttributes;