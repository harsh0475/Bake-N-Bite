import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema } from "../schema/productSchema";

import useCategories from "../../categories/hooks/useCategories";

import AdminSectionCard from "./AdminSectionCard";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductAttributes from "./ProductAttributes";
import ProductStatus from "./ProductStatus";
import ProductDisplaySettings from "./ProductDisplaySettings";

const ProductForm = ({
  formRef,
  initialValues,
  onSubmit,
}) => {

  const {
    categories,
    fetchCategories,
  } = useCategories();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(productSchema),

    defaultValues: {
      category_id:
        initialValues?.category_id ?? "",

      name:
        initialValues?.name ?? "",

      slug:
        initialValues?.slug ?? "",

      description:
        initialValues?.description ?? "",

      price:
        initialValues?.price ?? "",

      discount_price:
        initialValues?.discount_price ?? "",

      is_veg:
        initialValues?.is_veg ?? true,

      spice_level:
        initialValues?.spice_level ?? "None",

      prep_time:
        initialValues?.prep_time ?? 20,

      is_available:
        initialValues?.is_available ?? true,

      is_featured:
        initialValues?.is_featured ?? false,

      is_best_seller:
        initialValues?.is_best_seller ?? false,

      display_order:
        initialValues?.display_order ?? 0,
    },
  });

  useEffect(() => {

    fetchCategories();

  }, [fetchCategories]);

  useEffect(() => {

    if (!initialValues) return;

    reset({
      category_id:
        initialValues.category_id ?? "",

      name:
        initialValues.name ?? "",

      slug:
        initialValues.slug ?? "",

      description:
        initialValues.description ?? "",

      price:
        initialValues.price ?? "",

      discount_price:
        initialValues.discount_price ?? "",

      is_veg:
        initialValues.is_veg ?? true,

      spice_level:
        initialValues.spice_level ?? "None",

      prep_time:
        initialValues.prep_time ?? 20,

      is_available:
        initialValues.is_available ?? true,

      is_featured:
        initialValues.is_featured ?? false,

      is_best_seller:
        initialValues.is_best_seller ?? false,

      display_order:
        initialValues.display_order ?? 0,
    });

  }, [
    initialValues,
    reset,
  ]);

  const [
    isSlugEditable,
    setIsSlugEditable,
  ] = useState(false);

  return (

    <form
      id="product-form"
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 lg:space-y-8"
    >

      {/* ====================================================== */}
      {/* Basic Information */}
      {/* ====================================================== */}

      <AdminSectionCard
        title="Basic Information"
        description="Enter the essential information about this product."
      >
        <ProductBasicInfo
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
          categories={categories}
          isSlugEditable={isSlugEditable}
          setIsSlugEditable={setIsSlugEditable}
        />
      </AdminSectionCard>

      {/* ====================================================== */}
      {/* Pricing */}
      {/* ====================================================== */}

      <AdminSectionCard
        title="Pricing"
        description="Configure the selling price and optional discount for this product."
      >
        <ProductPricing
          register={register}
          watch={watch}
          errors={errors}
        />
      </AdminSectionCard>

      {/* ====================================================== */}
      {/* Attributes */}
      {/* ====================================================== */}

      <AdminSectionCard
        title="Product Attributes"
        description="Configure preparation details and food preferences."
      >
        <ProductAttributes
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
      </AdminSectionCard>

      {/* ====================================================== */}
      {/* Status */}
      {/* ====================================================== */}

      <AdminSectionCard
        title="Product Status"
        description="Control product availability and promotional visibility throughout the Bake N Bite website."
      >
        <ProductStatus
          register={register}
        />
      </AdminSectionCard>

      {/* ====================================================== */}
      {/* Display */}
      {/* ====================================================== */}

      <AdminSectionCard
        title="Display Settings"
        description="Configure how this product appears throughout the Bake N Bite customer website."
      >
        <ProductDisplaySettings
          register={register}
          errors={errors}
        />
      </AdminSectionCard>

      <button
        hidden
        type="submit"
      />

    </form>

  );

};

export default ProductForm;