import {
  useEffect,
  useState,
} from "react";

import {
  ImageOff,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getProductImages,
  deleteProductImage,
  setPrimaryProductImage,
} from "../api/adminApi";

import ImagePreviewCard from "./ImagePreviewCard";

import { getImageUrl } from "../../../9_utils/image";

const ProductImageGallery = ({
  productId,
  refreshKey,
}) => {

  const [images, setImages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================================================
  // Load Images
  // ======================================================

  const loadImages = async () => {

    try {

      setLoading(true);

      const data =
        await getProductImages(
          productId
        );

      setImages(data);

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.detail ??
          "Unable to load product images."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (productId) {

      loadImages();

    }

  }, [
    productId,
    refreshKey,
  ]);

  // ======================================================
  // Delete Image
  // ======================================================

  const handleDelete = async (
    imageId
  ) => {

    try {

      await deleteProductImage(
        imageId
      );

      toast.success(
        "Image deleted successfully."
      );

      loadImages();

    } catch (error) {

      toast.error(
        error?.response?.data?.detail ??
          "Unable to delete image."
      );

    }

  };

  // ======================================================
  // Set Primary
  // ======================================================

  const handlePrimary = async (
    imageId
  ) => {

    try {

      await setPrimaryProductImage(
        imageId
      );

      toast.success(
        "Primary image updated."
      );

      loadImages();

    } catch (error) {

      toast.error(
        error?.response?.data?.detail ??
          "Unable to update image."
      );

    }

  };

  // ======================================================
  // Loading
  // ======================================================

  if (loading) {

    return (

      <div className="flex flex-col items-center justify-center py-10 text-center">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

        <h3 className="mt-6 text-xl font-bold text-gray-900">

          Loading Images

        </h3>

        <p className="mt-2 text-gray-500">

          Please wait while we fetch your product gallery.

        </p>

      </div>

    );

  }

  // ======================================================
  // Empty
  // ======================================================

  if (images.length === 0) {

    return (

      <div className="rounded-[30px] border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50 px-8 py-14 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">

          <ImageOff
            size={42}
            className="text-orange-400"
          />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-gray-900">

          No Product Images

        </h3>

        <p className="mx-auto mt-4 max-w-xl leading-8 text-gray-500">

          Upload beautiful food images to attract more
          customers. The first uploaded image will
          automatically become the primary image shown
          throughout the website.

        </p>

      </div>

    );

  }

  // ======================================================
  // Gallery
  // ======================================================

  return (

    <div className="space-y-6">

      <div className="flex justify-end">

        <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-700">

          {images.length} Image
          {images.length !== 1 ? "s" : ""}

        </span>

      </div>

      <div
        className="
          grid
          gap-6

          grid-cols-1

          sm:grid-cols-2

          lg:grid-cols-3

          2xl:grid-cols-4
        "
      >

        {images.map((image) => (

          <ImagePreviewCard
            key={image.id}
            image={getImageUrl(
              image.image_url
            )}
            isPrimary={
              image.is_primary
            }
            onDelete={() =>
              handleDelete(
                image.id
              )
            }
            onPrimary={() =>
              handlePrimary(
                image.id
              )
            }
          />

        ))}

      </div>

    </div>

  );

};

export default ProductImageGallery;