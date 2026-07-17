import { useEffect } from "react";
import {
  FolderOpen,
  Pencil,
  Link2,
  FileText,
  Lock,
  Unlock,
} from "lucide-react";

const ProductBasicInfo = ({
  register,
  watch,
  setValue,
  errors,
  categories,
  isSlugEditable,
  setIsSlugEditable,
}) => {
  const productName = watch("name");

  useEffect(() => {
    if (!isSlugEditable && productName) {
      const slug = productName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setValue("slug", slug, {
        shouldValidate: true,
      });
    }
  }, [productName, isSlugEditable, setValue]);

  return (
    <div className="space-y-10">

      {/* ====================================================== */}
      {/* Category + Name */}
      {/* ====================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700">

            <FolderOpen
              size={18}
              className="text-orange-500"
            />

            Category

          </label>

          <select
            {...register("category_id", {
              setValueAs: (value) =>
                value === ""
                  ? undefined
                  : Number(value),
            })}
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          >

            <option value="">

              Select Category

            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.id}
              >

                {category.name}

              </option>

            ))}

          </select>

          {errors.category_id && (

            <p className="mt-2 text-sm text-red-500">

              {errors.category_id.message}

            </p>

          )}

        </div>

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700">

            <Pencil
              size={18}
              className="text-orange-500"
            />

            Product Name

          </label>

          <input
            type="text"
            placeholder="Chocolate Truffle Cake"
            {...register("name")}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          {errors.name && (

            <p className="mt-2 text-sm text-red-500">

              {errors.name.message}

            </p>

          )}

        </div>

      </div>

      {/* ====================================================== */}
      {/* Slug */}
      {/* ====================================================== */}

      <div>

        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <label className="flex items-center gap-2 font-semibold text-gray-700">

            <Link2
              size={18}
              className="text-orange-500"
            />

            Product URL (Slug)

          </label>

          <button
            type="button"
            onClick={() =>
              setIsSlugEditable(
                (previous) => !previous
              )
            }
            className="flex w-fit items-center gap-2 rounded-xl bg-orange-100 px-4 py-2 font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white"
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
          className={`w-full rounded-2xl px-5 py-4 outline-none transition ${
            isSlugEditable
              ? "border border-orange-500 bg-white focus:ring-4 focus:ring-orange-100"
              : "border border-gray-300 bg-gray-100 text-gray-500"
          }`}
        />

        <p className="mt-3 text-sm text-gray-500">

          Automatically generated from the product name.
          Unlock it if you want to use a custom URL.

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

        <label className="mb-3 flex items-center gap-2 font-semibold text-gray-700">

          <FileText
            size={18}
            className="text-orange-500"
          />

          Product Description

        </label>

        <textarea
          rows={7}
          placeholder="Describe the ingredients, taste, preparation style and what makes this product special..."
          {...register("description")}
          className="w-full rounded-2xl border border-gray-300 px-5 py-4 leading-7 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />

        <div className="mt-4 rounded-xl bg-orange-50 p-4">

          <p className="text-sm text-orange-700">

            💡 Tip: A detailed product description improves customer trust and helps increase conversions.

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

export default ProductBasicInfo;