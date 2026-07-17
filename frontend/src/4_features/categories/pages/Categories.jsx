// src/4_features/categories/pages/Categories.jsx
import { useEffect } from "react";

import useCategories from "../hooks/useCategories";

import CategoryGrid from "../components/CategoryGrid";

import Container from "../../../3_components/common/Container";
import SectionTitle from "../../../3_components/common/SectionTitle";
import PromoBanner from "../../../3_components/common/PromoBanner";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";

const Categories = () => {
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
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Categories" },
          ]}
        />

        <PromoBanner
          badge="Homemade Everyday"
          title="Explore Every Delicious Category"
          description="Cakes, Momos, Sandwiches, Noodles, Snacks and much more, freshly prepared with love."
          className="mt-6 lg:mt-8"
        />

        <div className="mt-14">
          <SectionTitle
            badge="Categories"
            title="Browse Categories"
            subtitle="Choose your favourite category and discover freshly prepared homemade food."
            align="left"
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
        </div>
      </Container>
    </section>
  );
};

export default Categories;