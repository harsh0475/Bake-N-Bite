import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
} from "lucide-react";

import categoryPlaceholder from "../../../2_assets/images/category-placeholder.png";

import { getImageUrl } from "../../../9_utils/image";

const CategoryTable = ({
  categories,
  onDelete,
}) => {
  return (

    <>

      {/* ====================================================== */}
      {/* Mobile Cards */}
      {/* ====================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:hidden">

        {categories.map((category) => {

          const image =
            category.image
              ? getImageUrl(category.image)
              : categoryPlaceholder;

          return (

            <div
              key={category.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-orange-100
                bg-white
                shadow-md
                transition-all

                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <img
                src={image}
                alt={category.name}
                onError={(event) => {
                  event.currentTarget.src =
                    categoryPlaceholder;
                }}
                className="h-24 w-full object-cover sm:h-32"
              />

              <div className="space-y-2.5 p-2.5">

                <div>

                  <h3 className="line-clamp-2 text-xs font-black leading-tight text-gray-900 sm:text-sm">

                    {category.name}

                  </h3>

                  <p className="mt-0.5 truncate text-[10px] text-gray-500">

                    /{category.slug}

                  </p>

                </div>

                <div className="flex flex-wrap gap-1">

                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      category.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {category.is_active
                      ? "Active"
                      : "Inactive"}

                  </span>

                  {category.show_on_homepage && (

                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-semibold text-orange-700">

                      Homepage

                    </span>

                  )}

                </div>

                <div className="flex justify-center gap-2">

                  <Link
                    to={`/admin/categories/${category.id}/edit`}
                    aria-label="Edit"
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-xl bg-orange-500 text-white
                      transition hover:bg-orange-600
                    "
                  >
                    <Edit size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDelete(category)}
                    aria-label="Delete"
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-xl bg-red-500 text-white
                      transition hover:bg-red-600
                    "
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

      {/* ====================================================== */}
      {/* Desktop Table */}
      {/* ====================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-orange-100 lg:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="sticky top-0 z-10 border-b border-orange-100 bg-orange-50">

              <tr>

                <th className="px-8 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Category

                </th>

                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Slug

                </th>

                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Homepage

                </th>

                <th className="px-8 py-5 text-right text-xs font-black uppercase tracking-wider text-gray-600">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-orange-50 bg-white">

              {categories.map((category) => {

                const image =
                  category.image
                    ? getImageUrl(category.image)
                    : categoryPlaceholder;

                return (

                  <tr
                    key={category.id}
                    className="
                      border-b
                      border-orange-50
                      transition-all

                      hover:bg-orange-50/60
                    "
                  >

                    <td className="px-8 py-5">

                      <div className="flex items-center gap-5">

                        <div className="h-20 w-20 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50">

                          <img
                            src={image}
                            alt={category.name}
                            onError={(event) => {
                              event.currentTarget.src =
                                categoryPlaceholder;
                            }}
                            className="h-full w-full object-cover"
                          />

                        </div>

                        <div className="min-w-0">

                          <h3 className="truncate text-lg font-black text-gray-900">

                            {category.name}

                          </h3>

                          <p className="mt-1 text-sm text-gray-500">

                            /{category.slug}

                          </p>

                          <span
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              category.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >

                            {category.is_active
                              ? "Active"
                              : "Inactive"}

                          </span>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <span className="font-semibold text-gray-700">

                        {category.slug}

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                          category.show_on_homepage
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >

                        {category.show_on_homepage
                          ? "Visible"
                          : "Hidden"}

                      </span>

                    </td>

                    <td className="px-8 py-5">

                      <div className="flex justify-end gap-3">

                        <Link
                          to={`/admin/categories/${category.id}/edit`}
                          className="
                            rounded-2xl
                            bg-orange-100
                            p-3
                            text-orange-600
                            transition-all

                            hover:bg-orange-500
                            hover:text-white
                          "
                        >

                          <Edit size={18} />

                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            onDelete(category)
                          }
                          className="
                            rounded-2xl
                            bg-red-100
                            p-3
                            text-red-600
                            transition-all

                            hover:bg-red-500
                            hover:text-white
                          "
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
};

export default CategoryTable;
