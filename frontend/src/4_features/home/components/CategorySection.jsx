// src/4_features/home/components/CategorySection.jsx
import { useEffect } from "react";

import useCategories from "../../categories/hooks/useCategories";
import CategoryGrid from "../../categories/components/CategoryGrid";

import Section from "../../../3_components/common/Section";
import SectionTitle from "../../../3_components/common/SectionTitle";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";

const CategorySection = () => {
  const {
    categories,
    loading,
    error,
    fetchCategories,
  } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Section background="bg-white" spacing="none" className="pt-6 pb-10 lg:pt-8 lg:pb-14">
      <SectionTitle
        badge="Our Menu"
        title="Browse Categories"
        subtitle="Choose your favourite food category and discover freshly prepared homemade meals."
      />

      {loading.categories && (
        <LoadingSpinner text="Fetching categories..." />
      )}

      {!loading.categories && error.categories && (
        <ErrorState
          title="Unable to load categories"
          description={error.categories}
          onRetry={fetchCategories}
        />
      )}

      {!loading.categories && !error.categories && categories.length === 0 && (
        <EmptyState
          title="No Categories"
          description="Categories will appear here once they are added."
        />
      )}

      {!loading.categories && !error.categories && categories.length > 0 && (
        <CategoryGrid categories={categories} />
      )}
    </Section>
  );
};

export default CategorySection;