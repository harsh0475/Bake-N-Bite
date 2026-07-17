// src/4_features/home/components/BestSellerSection.jsx
import Section from "../../../3_components/common/Section";
import SectionTitle from "../../../3_components/common/SectionTitle";

import ProductGrid from "../../products/components/ProductGrid";
import useProductQuery from "../../products/hooks/useProductQuery";

const BestSellerSection = () => {
  const {
    products,
    loading,
    error,
  } = useProductQuery({ best_seller: true });

  return (
    <Section background="bg-orange-50/60" spacing="none" className="py-10 lg:py-14">
      <SectionTitle
        badge="Customer Favorites"
        title="Most Loved Dishes"
        subtitle="Discover the most loved homemade dishes, chosen and reordered by our happy customers."
      />

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        emptyMessage="No best seller products available."
        scrollOnMobile
      />
    </Section>
  );
};

export default BestSellerSection;