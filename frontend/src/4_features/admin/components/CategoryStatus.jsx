import {
  Eye,
  Home,
} from "lucide-react";

const CategoryStatus = ({
  register,
}) => {
  return (
    <div className="space-y-8 lg:space-y-10">

      {/* ====================================================== */}
      {/* Status Cards */}
      {/* ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ====================================================== */}
        {/* Active */}
        {/* ====================================================== */}

        <label className="cursor-pointer">

          <input
            type="checkbox"
            {...register("is_active")}
            className="peer hidden"
          />

          <div className="rounded-3xl border-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:border-green-300 hover:shadow-lg peer-checked:border-green-500 peer-checked:bg-green-50 sm:p-6 lg:p-8">

            <div className="flex items-start gap-4 sm:gap-5">

              <div className="rounded-2xl bg-green-100 p-3 sm:p-4">

                <Eye
                  size={30}
                  className="text-green-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-900 lg:text-xl">

                  Active

                </h3>

                <p className="mt-3 leading-7 text-gray-500">

                  Customers can browse products in this category throughout the website.

                </p>

              </div>

            </div>

          </div>

        </label>

        {/* ====================================================== */}
        {/* Homepage */}
        {/* ====================================================== */}

        <label className="cursor-pointer">

          <input
            type="checkbox"
            {...register("show_on_homepage")}
            className="peer hidden"
          />

          <div className="rounded-3xl border-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:border-orange-300 hover:shadow-lg peer-checked:border-orange-500 peer-checked:bg-orange-50 sm:p-6 lg:p-8">

            <div className="flex items-start gap-4 sm:gap-5">

              <div className="rounded-2xl bg-orange-100 p-3 sm:p-4">

                <Home
                  size={30}
                  className="text-orange-500"
                />

              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-900 lg:text-xl">

                  Homepage Category

                </h3>

                <p className="mt-3 leading-7 text-gray-500">

                  Display this category in the featured categories section on the homepage.

                </p>

              </div>

            </div>

          </div>

        </label>

      </div>

    </div>
  );
};

export default CategoryStatus;