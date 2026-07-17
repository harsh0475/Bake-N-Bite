import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderPlus,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

import useCategories from "../../categories/hooks/useCategories";

import AdminHero from "../components/AdminHero";
import AdminBottomActionBar from "../components/AdminBottomActionBar";
import CategoryForm from "../../admin/components/CategoryForm";

const AddCategory = () => {
  const navigate = useNavigate();

  const formRef = useRef(null);

  const {
    createCategory,
    uploadImage,
    loading,
  } = useCategories();

  const handleSubmit = async ({
    formData,
    imageFile,
  }) => {
    try {
      const category =
        await createCategory(formData);

      if (imageFile) {
        await uploadImage(
          category.id,
          imageFile
        );
      }

      toast.success(
        "Category created successfully."
      );

      navigate("/admin/categories");
    } catch (error) {
      toast.error(
        error ||
          "Unable to create category."
      );
    }
  };

  const isSubmitting =
    loading.create || loading.uploadImage;

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">

      <div className="mx-auto max-w-7xl px-3 pt-4 pb-36 sm:px-5 sm:pt-6 lg:px-8 lg:pt-8">

        {/* ================= Hero ================= */}

        <AdminHero
          badge="📂 Bake N Bite Admin"
          title="Create Category"
          description="Organize your menu into beautiful categories so customers can browse food easily."
        >
          <div className="grid w-full grid-cols-2 gap-4 lg:w-auto">

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <FolderPlus size={30} />

              <h3 className="mt-3 text-lg font-bold">
                New
              </h3>

              <p className="text-sm">
                Category
              </p>

            </div>

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <Sparkles size={30} />

              <h3 className="mt-3 text-lg font-bold">
                Premium
              </h3>

              <p className="text-sm">
                Experience
              </p>

            </div>

          </div>
        </AdminHero>

        {/* Form */}

        <div className="mt-8">

          <CategoryForm
            formRef={formRef}
            loading={isSubmitting}
            submitLabel="Create Category"
            onSubmit={handleSubmit}
          />

        </div>

      </div>

      {/* ================= Bottom Action Bar ================= */}

      <AdminBottomActionBar
        backText="Back"
        submitText="Create"
        loadingText="Creating..."
        loading={isSubmitting}
        onBack={() => navigate("/admin/categories")}
        onSubmit={() => formRef.current?.requestSubmit()}
      />

    </section>
  );
};

export default AddCategory;
