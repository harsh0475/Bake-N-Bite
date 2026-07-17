import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PackagePlus,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

import useAdmin from "../hooks/useAdmin";

import {
  uploadMultipleProductImages,
} from "../api/adminApi";

import AdminHero from "../components/AdminHero";
import AdminSectionCard from "../components/AdminSectionCard";
import AdminBottomActionBar from "../components/AdminBottomActionBar";

import ProductForm from "../components/ProductForm";
import ProductImageUploader from "../components/ProductImageUploader";

const AddProduct = () => {

  const navigate = useNavigate();

  const formRef = useRef(null);

  const {
    createProduct,
    loading,
  } = useAdmin();

  const [images, setImages] = useState([]);

  // ======================================================
  // Create Product
  // ======================================================

  const handleSubmit = async (productData) => {

    try {

      const createdProduct =
        await createProduct(productData);

      if (images.length > 0) {

        await uploadMultipleProductImages(
          createdProduct.id,
          images
        );

      }

      toast.success(
        "Product created successfully."
      );

      navigate("/admin/products");

    } catch (error) {

      toast.error(
        error ||
        "Unable to create product."
      );

    }

  };

  return (

    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">

      <div className="mx-auto max-w-7xl px-3 pt-4 pb-36 sm:px-5 sm:pt-6 lg:px-8 lg:pt-8">

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <AdminHero
          badge="🍴 Bake N Bite Admin"
          title="Create Product"
          description="Add delicious food items with pricing, category, availability and beautiful product images."
        >
          <div className="grid w-full grid-cols-2 gap-4 lg:w-auto">

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <PackagePlus size={30} />

              <h3 className="mt-3 text-lg font-bold">
                New Product
              </h3>

              <p className="text-sm">
                Ready to Publish
              </p>

            </div>

            <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

              <Sparkles size={30} />

              <h3 className="mt-3 text-lg font-bold">
                Premium UI
              </h3>

              <p className="text-sm">
                Mobile Friendly
              </p>

            </div>

          </div>
        </AdminHero>

        {/* ====================================================== */}
        {/* Form */}
        {/* ====================================================== */}

        <div className="mt-8">

          <ProductForm
            formRef={formRef}
            onSubmit={handleSubmit}
          />

        </div>

        {/* ====================================================== */}
        {/* Images */}
        {/* ====================================================== */}

        <div className="mt-6 lg:mt-8">

          <AdminSectionCard
            title="Product Images"
            description="Upload multiple product images. The first image automatically becomes the primary image."
          >
            <ProductImageUploader
              images={images}
              onChange={setImages}
            />
          </AdminSectionCard>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Sticky Footer */}
      {/* ====================================================== */}

      <AdminBottomActionBar
        backText="Back"
        submitText="Create Product"
        loadingText="Creating..."
        loading={loading.createProduct}
        onBack={() => navigate("/admin/products")}
        onSubmit={() => formRef.current?.requestSubmit()}
      />

    </section>

  );

};

export default AddProduct;
