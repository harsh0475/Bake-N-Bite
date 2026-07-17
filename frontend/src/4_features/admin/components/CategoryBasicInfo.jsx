import { useEffect } from "react";
import {
  FolderTree,
  Link2,
  FileText,
  Lock,
  Unlock,
} from "lucide-react";

const CategoryBasicInfo = ({
  register,
  watch,
  setValue,
  errors,
  isSlugEditable,
  setIsSlugEditable,
}) => {

  const categoryName =
    watch("name");

  useEffect(() => {

    if (!isSlugEditable && categoryName) {

      const slug = categoryName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setValue("slug", slug, {
        shouldValidate: true,
      });

    }

  }, [
    categoryName,
    isSlugEditable,
    setValue,
  ]);

  return (

    <div className="space-y-8 lg:space-y-10">

      {/* ====================================================== */}
      {/* Category Name */}
      {/* ====================================================== */}

      <div>

        <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 lg:text-base">

          <FolderTree
            size={18}
            className="text-orange-500"
          />

          Category Name

        </label>

        <input
          type="text"
          placeholder="Cakes"
          {...register("name")}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 transition outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:px-5 sm:py-4"
        />

        {errors.name && (

          <p className="mt-2 text-sm text-red-500">

            {errors.name.message}

          </p>

        )}

      </div>

      {/* ====================================================== */}
      {/* Slug */}
      {/* ====================================================== */}

      <div>

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 lg:text-base">

            <Link2
              size={18}
              className="text-orange-500"
            />

            Category URL (Slug)

          </label>

          <button
            type="button"
            onClick={() =>
              setIsSlugEditable(
                (previous) => !previous
              )
            }
            className="flex w-fit items-center gap-2 rounded-xl bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white"
          >

            {isSlugEditable ? (
              <>
                <Lock size={16} />
                Lock
              </>
            ) : (
              <>
                <Unlock size={16} />
                Edit
              </>
            )}

          </button>

        </div>

        <input
          type="text"
          readOnly={!isSlugEditable}
          {...register("slug")}
          className={`w-full rounded-2xl border px-4 py-3 outline-none transition sm:px-5 sm:py-4 ${
            isSlugEditable
              ? "border-orange-500 bg-white focus:ring-4 focus:ring-orange-100"
              : "border-gray-300 bg-gray-100 text-gray-500"
          }`}
        />

        <p className="mt-3 text-sm text-gray-500">

          Automatically generated from the category name.
          Unlock it if you want a custom URL.

        </p>

        {errors.slug && (

          <p className="mt-2 text-sm text-red-500">

            {errors.slug.message}

          </p>

        )}

      </div>

      {/* ====================================================== */}
      {/* Description */}
      {/* ====================================================== */}

      <div>

        <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 lg:text-base">

          <FileText
            size={18}
            className="text-orange-500"
          />

          Category Description

        </label>

        <textarea
          rows={7}
          placeholder="Describe this category..."
          {...register("description")}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 leading-7 transition outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:px-5 sm:py-4"
        />

        <div className="mt-4 rounded-xl bg-orange-50 p-4">

          <p className="text-sm text-orange-700">

            💡 Tip: A good description helps customers
            quickly understand what products belong
            to this category.

          </p>

        </div>

        {errors.description && (

          <p className="mt-2 text-sm text-red-500">

            {errors.description.message}

          </p>

        )}

      </div>

    </div>

  );

};

export default CategoryBasicInfo;