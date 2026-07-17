// src/4_features/products/pages/ProductDetails.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useProducts from "../hooks/useProducts";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";

import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductActions from "../components/ProductActions";
import RelatedProducts from "../components/RelatedProducts";
import ProductSpecification from "../components/ProductSpecification";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    selectedProduct,
    loadingProduct,
    error,
    fetchProduct,
  } = useProducts();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  // ======================================================
  // Loading
  // ======================================================

  if (loadingProduct) {
    return (
      <div className="flex justify-center py-24">
        <LoadingSpinner text="Fetching product details..." />
      </div>
    );
  }

  // ======================================================
  // Error
  // ======================================================

  if (error) {
    return (
      <Container className="py-24">
        <ErrorState
          title="Unable to load product"
          description={error}
          onRetry={() => fetchProduct(id)}
        />
      </Container>
    );
  }

  // ======================================================
  // Product Not Found
  // ======================================================

  if (!selectedProduct) {
    return (
      <Container className="py-24">
        <ErrorState
          title="Product Not Found"
          description="The requested product does not exist."
        />
      </Container>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Menu", href: "/products" },
            { label: selectedProduct.name },
          ]}
        />

        {/* ====================================================== */}
        {/* Product Details */}
        {/* ====================================================== */}

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            images={selectedProduct.images}
            productName={selectedProduct.name}
          />

          <div className="space-y-8 lg:space-y-10">
            <ProductInfo product={selectedProduct} />

            <ProductActions product={selectedProduct} />

            <ProductSpecification product={selectedProduct} />
          </div>
        </div>

        {/* ====================================================== */}
        {/* Related Products */}
        {/* ====================================================== */}

        <RelatedProducts
          categoryId={selectedProduct.category_id}
          currentProductId={selectedProduct.id}
        />
      </Container>
    </section>
  );
};

export default ProductDetails;