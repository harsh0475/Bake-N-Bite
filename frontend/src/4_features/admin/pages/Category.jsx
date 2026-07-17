import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Layers3,
  Eye,
  FolderTree,
} from "lucide-react";
import { toast } from "react-toastify";

import useCategories from "../../categories/hooks/useCategories";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";

import AdminHero from "../components/AdminHero";
import AdminSectionHeader from "../components/AdminSectionHeader";
import AdminSectionCard from "../components/AdminSectionCard";

import DashboardCard from "../components/DashboardCard";
import CategoryTable from "../components/CategoryTable";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Category = () => {

  const navigate = useNavigate();

  const {
    categories,
    loading,
    error,
    fetchCategories,
    deleteCategory,
  } = useCategories();

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(null);

  const [
    openDeleteModal,
    setOpenDeleteModal,
  ] = useState(false);

  useEffect(() => {

    fetchCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {

    if (!selectedCategory) {
      return;
    }

    try {

      await deleteCategory(
        selectedCategory.id
      );

      toast.success(
        "Category deleted successfully."
      );

      setOpenDeleteModal(false);

      setSelectedCategory(null);

    } catch (error) {

      toast.error(
        error ||
        "Unable to delete category."
      );

    }

  };

  if (loading.categories) {

    return <LoadingSpinner text="Fetching categories..." />;

  }

  if (error.categories) {

    return (

      <ErrorState
        title="Unable to load categories"
        description={error.categories}
        onRetry={fetchCategories}
      />

    );

  }

  const homepageCount = categories.filter(
    (category) => category.show_on_homepage
  ).length;

  return (

    <section className="space-y-8 lg:space-y-10">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <AdminHero
        badge="📂 Bake N Bite Admin"
        title="Categories"
        description="Organize your menu into beautiful categories for a better customer browsing experience."
        stats={[
          { label: "Categories", value: categories.length },
        ]}
        buttonText="Create Category"
        buttonIcon={<Plus size={22} strokeWidth={2.5} />}
        buttonTo="/admin/categories/new"
      />

      {/* ====================================================== */}
      {/* Statistics */}
      {/* ====================================================== */}

      <div>
        <AdminSectionHeader
          title="Overview"
          description="A quick look at how your menu is organized."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">

          <DashboardCard
            title="Total Categories"
            value={categories.length}
            subtitle="All Categories"
            color="orange"
            icon={<Layers3 size={28} />}
          />

          <DashboardCard
            title="Homepage Categories"
            value={homepageCount}
            subtitle="Visible on Homepage"
            color="blue"
            icon={<Eye size={28} />}
          />

        </div>
      </div>

      {/* ====================================================== */}
      {/* Table */}
      {/* ====================================================== */}

      {categories.length === 0 ? (

        <EmptyState
          title="No Categories Found"
          description="Create your first category to start organizing your menu."
          buttonText="Create Category"
          onButtonClick={() => navigate("/admin/categories/new")}
        />

      ) : (

        <AdminSectionCard
          title="Categories"
          description={`Showing ${categories.length} categor${
            categories.length !== 1 ? "ies" : "y"
          }.`}
          actions={
            <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              <FolderTree size={16} />

              Total {categories.length}
            </div>
          }
        >
          <CategoryTable
            categories={categories}
            onDelete={(category) => {

              setSelectedCategory(category);

              setOpenDeleteModal(true);

            }}
          />
        </AdminSectionCard>

      )}

      {/* ====================================================== */}
      {/* Delete Modal */}
      {/* ====================================================== */}

      <DeleteConfirmationModal
        open={openDeleteModal}
        title="Delete Category"
        description={`You are about to permanently delete "${selectedCategory?.name}".`}
        loading={loading.delete}
        onCancel={() => {

          setOpenDeleteModal(false);

          setSelectedCategory(null);

        }}
        onConfirm={handleDelete}
      />

    </section>

  );

};

export default Category;
