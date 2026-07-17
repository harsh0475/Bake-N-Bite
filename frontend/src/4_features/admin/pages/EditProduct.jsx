import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Images,
  Pencil,
} from "lucide-react";

import { toast } from "react-toastify";

import useAdmin from "../hooks/useAdmin";

import {
  uploadMultipleProductImages,
} from "../api/adminApi";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

import AdminHero from "../components/AdminHero";
import AdminSectionCard from "../components/AdminSectionCard";
import AdminBottomActionBar from "../components/AdminBottomActionBar";

import ProductForm from "../components/ProductForm";
import ProductImageUploader from "../components/ProductImageUploader";
import ProductImageGallery from "../components/ProductImageGallery";

const EditProduct = () => {

  const { productId } =
    useParams();

  const navigate =
    useNavigate();

  const formRef = useRef(null);

  const {
    selectedProduct,
    loading,
    error,
    fetchProduct,
    updateProduct,
  } = useAdmin();

  const [
    newImages,
    setNewImages,
  ] = useState([]);

  const [
    refreshGallery,
    setRefreshGallery,
  ] = useState(0);

  // ======================================================
  // Load Product
  // ======================================================

  useEffect(() => {

    fetchProduct(productId);

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [productId]);

  // ======================================================
  // Submit
  // ======================================================

  const handleSubmit =
    async (productData) => {

      try {

        await updateProduct({
          productId,
          productData,
        });

        if (newImages.length > 0) {

          await uploadMultipleProductImages(
            productId,
            newImages
          );

          setNewImages([]);

          setRefreshGallery(
            previous =>
              previous + 1
          );

        }

        toast.success(
          "Product updated successfully."
        );

        navigate(
          "/admin/products"
        );

      } catch (error) {

        toast.error(
          error ||
          "Unable to update product."
        );

      }

    };

  // ======================================================
  // Loading
  // ======================================================

  if (
    loading.product &&
    !selectedProduct
  ) {

    return <LoadingSpinner text="Fetching product details..." />;

  }

  // ======================================================
  // Error
  // ======================================================

  if (error.product) {

    return (

      <ErrorState
        title="Unable to load product"
        description={error.product}
        onRetry={() => fetchProduct(productId)}
      />

    );

  }

  // ======================================================
  // Not Found
  // ======================================================

  if (!selectedProduct) {

    return (

      <ErrorState
        title="Product Not Found"
        description="The requested product does not exist."
      />

    );

  }

  const isSubmitting = loading.updateProduct;

  return (

    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">

      <div className="mx-auto max-w-7xl px-3 pt-4 pb-36 sm:px-5 sm:pt-6 lg:px-8 lg:pt-8">

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <AdminHero
          badge="✏️ Bake N Bite Admin"
          title="Edit Product"
          description="Update pricing, availability, category, display settings and product images."
        >
          <div className="grid w-full grid-cols-2 gap-4 lg:w-auto">

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <Pencil size={30} />

              <h3 className="mt-3 text-lg font-bold">
                Editing
              </h3>

              <p className="truncate text-sm">
                {selectedProduct.name}
              </p>

            </div>

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <Images size={30} />

              <h3 className="mt-3 text-lg font-bold">
                Gallery
              </h3>

              <p className="text-sm">
                Manage Images
              </p>

            </div>

          </div>
        </AdminHero>

        {/* ====================================================== */}
        {/* Product Form */}
        {/* ====================================================== */}

        <div className="mt-8">

          <ProductForm
            formRef={formRef}
            initialValues={selectedProduct}
            onSubmit={handleSubmit}
          />

        </div>

        {/* ====================================================== */}
        {/* Existing Images */}
        {/* ====================================================== */}

        <div className="mt-6 lg:mt-8">

          <AdminSectionCard
            title="Existing Images"
            description="Manage existing product images, choose the primary image or delete unwanted ones."
          >
            <ProductImageGallery
              productId={productId}
              refreshKey={refreshGallery}
            />
          </AdminSectionCard>

        </div>

        {/* ====================================================== */}
        {/* Upload New Images */}
        {/* ====================================================== */}

        <div className="mt-6 lg:mt-8">

          <AdminSectionCard
            title="Upload New Images"
            description="Add more images to improve product presentation."
          >
            <ProductImageUploader
              images={newImages}
              onChange={setNewImages}
            />
          </AdminSectionCard>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Sticky Footer */}
      {/* ====================================================== */}

      <AdminBottomActionBar
        backText="Back"
        submitText="Update Product"
        loadingText="Updating..."
        loading={isSubmitting}
        onBack={() => navigate("/admin/products")}
        onSubmit={() => formRef.current?.requestSubmit()}
      />

    </section>

  );

};

export default EditProduct;
