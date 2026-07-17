// src/4_features/products/components/RelatedProducts.jsx
import useProductQuery from "../hooks/useProductQuery";

import ProductGrid from "./ProductGrid";
import PromoBanner from "../../../3_components/common/PromoBanner";

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const { products, loading, error } = useProductQuery({
    category_id: categoryId,
  });

  const relatedProducts = products.filter(
    (product) => product.id !== currentProductId
  );

  if (!loading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 lg:mt-28">
      <PromoBanner
        badge="🍽 Recommended For You"
        title="You May Also Like"
        description="Customers who loved this item also enjoyed these freshly prepared homemade dishes."
        className="mb-12"
      />

      <ProductGrid
        products={relatedProducts}
        loading={loading}
        error={error}
        emptyMessage="No related products available."
      />
    </section>
  );
};

export default RelatedProducts;