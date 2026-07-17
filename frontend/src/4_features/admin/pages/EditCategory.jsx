import { useEffect, useRef } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FolderOpen,
  Pencil,
} from "lucide-react";

import { toast } from "react-toastify";

import useCategories from "../../categories/hooks/useCategories";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

import AdminHero from "../components/AdminHero";
import AdminBottomActionBar from "../components/AdminBottomActionBar";
import CategoryForm from "../../admin/components/CategoryForm";

const EditCategory = () => {
  const { categoryId } = useParams();

  const navigate = useNavigate();

  const formRef = useRef(null);

  const {
    selectedCategory,
    loading,
    error,
    fetchCategory,
    updateCategory,
    uploadImage,
  } = useCategories();

  useEffect(() => {
    fetchCategory(categoryId);
  }, [
    fetchCategory,
    categoryId,
  ]);

  const handleSubmit = async ({
    formData,
    imageFile,
  }) => {
    try {
      const category =
        await updateCategory(
          categoryId,
          formData
        );

      if (imageFile) {
        await uploadImage(
          category.id,
          imageFile
        );
      }

      toast.success(
        "Category updated successfully."
      );

      navigate(
        "/admin/categories"
      );
    } catch (error) {
      toast.error(
        error ||
          "Unable to update category."
      );
    }
  };

  if (loading.category) {
    return <LoadingSpinner text="Fetching category..." />;
  }

  if (error.category) {
    return (
      <ErrorState
        title="Unable to load category"
        description={error.category}
        onRetry={() => fetchCategory(categoryId)}
      />
    );
  }

  if (!selectedCategory) {
    return (
      <ErrorState
        title="Category Not Found"
        description="The requested category does not exist."
      />
    );
  }

  const isSubmitting =
    loading.update || loading.uploadImage;

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">

      <div className="mx-auto max-w-7xl px-3 pt-4 pb-36 sm:px-5 sm:pt-6 lg:px-8 lg:pt-8">

        {/* ================= Hero ================= */}

        <AdminHero
          badge="✏️ Bake N Bite Admin"
          title="Edit Category"
          description="Update category information, replace images and manage menu organization."
        >
          <div className="grid w-full grid-cols-2 gap-4 lg:w-auto">

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <Pencil size={30} />

              <h3 className="mt-3 text-lg font-bold">
                Editing
              </h3>

              <p className="truncate text-sm">
                {selectedCategory.name}
              </p>

            </div>

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <FolderOpen size={30} />

              <h3 className="mt-3 text-lg font-bold">
                Category
              </h3>

              <p className="text-sm">
                Menu
              </p>

            </div>

          </div>
        </AdminHero>

        {/* ================= Form ================= */}

        <div className="mt-8">

          <CategoryForm
            formRef={formRef}
            initialValues={selectedCategory}
            loading={isSubmitting}
            submitLabel="Update Category"
            onSubmit={handleSubmit}
          />

        </div>

      </div>

      {/* ================= Sticky Bottom ================= */}

      <AdminBottomActionBar
        backText="Back"
        submitText="Update"
        loadingText="Updating..."
        loading={isSubmitting}
        onBack={() => navigate("/admin/categories")}
        onSubmit={() => formRef.current?.requestSubmit()}
      />

    </section>
  );
};

export default EditCategory;
