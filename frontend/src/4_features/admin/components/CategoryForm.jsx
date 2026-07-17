import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import AdminSectionCard from "./AdminSectionCard";

import CategoryBasicInfo from "./CategoryBasicInfo";
import CategoryImageUploader from "./CategoryImageUploader";
import CategoryDisplaySettings from "./CategoryDisplaySettings";
import CategoryStatus from "./CategoryStatus";

const EMPTY_CATEGORY = {
  name: "",
  slug: "",
  description: "",
  image: "",
  display_order: 0,
  is_active: true,
  show_on_homepage: true,
};

const CategoryForm = ({
  formRef,
  initialValues = EMPTY_CATEGORY,
  loading = false,
  submitLabel = "Save Category",
  onSubmit,
}) => {

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
    defaultValues: EMPTY_CATEGORY,
  });

  const [imageFile, setImageFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [
    isSlugEditable,
    setIsSlugEditable,
  ] = useState(false);

  useEffect(() => {

    reset({
      name:
        initialValues.name ?? "",
      slug:
        initialValues.slug ?? "",
      description:
        initialValues.description ?? "",
      image:
        initialValues.image ?? "",
      display_order:
        initialValues.display_order ?? 0,
      is_active:
        initialValues.is_active ?? true,
      show_on_homepage:
        initialValues.show_on_homepage ?? true,
    });

    setPreview(
      initialValues.image ?? ""
    );

    setImageFile(null);

  }, [
    initialValues,
    reset,
  ]);

  const submitForm = (data) => {

    onSubmit({
      formData: data,
      imageFile,
    });

  };

  return (

    <form
      id="category-form"
      ref={formRef}
      onSubmit={handleSubmit(submitForm)}
      className="space-y-6 lg:space-y-8"
    >

      <AdminSectionCard
        title="Basic Information"
        description="Enter the basic details of the category."
      >
        <CategoryBasicInfo
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
          isSlugEditable={isSlugEditable}
          setIsSlugEditable={setIsSlugEditable}
        />
      </AdminSectionCard>

      <AdminSectionCard
        title="Category Image"
        description="Upload an attractive image that represents this category."
      >
        <CategoryImageUploader
          preview={preview}
          setPreview={setPreview}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      </AdminSectionCard>

      <AdminSectionCard
        title="Display Settings"
        description="Configure how this category appears across the customer website."
      >
        <CategoryDisplaySettings
          register={register}
          errors={errors}
        />
      </AdminSectionCard>

      <AdminSectionCard
        title="Category Status"
        description="Control whether this category is active and visible on the homepage."
      >
        <CategoryStatus
          register={register}
        />
      </AdminSectionCard>

      <button
        hidden
        type="submit"
        disabled={loading}
      >
        {submitLabel}
      </button>

    </form>

  );

};

export default CategoryForm;