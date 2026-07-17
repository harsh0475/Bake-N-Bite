// src/4_features/home/components/FeaturedProducts.jsx
import Section from "../../../3_components/common/Section";
import SectionTitle from "../../../3_components/common/SectionTitle";

import ProductGrid from "../../products/components/ProductGrid";
import useProductQuery from "../../products/hooks/useProductQuery";

const FeaturedProducts = () => {
  const {
    products,
    loading,
    error,
  } = useProductQuery({ featured: true });

  return (
    <Section background="bg-white" spacing="none" className="py-10 lg:py-14">
      <SectionTitle
        badge="Handpicked"
        title="Featured Products"
        subtitle="Handpicked homemade dishes prepared with fresh ingredients."
      />

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        emptyMessage="No featured products available."
        scrollOnMobile
      />
    </Section>
  );
};

export default FeaturedProducts;