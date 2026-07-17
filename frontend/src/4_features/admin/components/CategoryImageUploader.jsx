import { useEffect, useRef } from "react";
import {
  UploadCloud,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { toast } from "react-toastify";

import { getImageUrl } from "../../../9_utils/image";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const CategoryImageUploader = ({
  preview,
  setPreview,
  imageFile,
  setImageFile,
}) => {

  const inputRef =
    useRef(null);

  useEffect(() => {

    return () => {

      if (
        preview &&
        preview.startsWith("blob:")
      ) {

        URL.revokeObjectURL(preview);

      }

    };

  }, [preview]);

  const validateImage = (
    file
  ) => {

    if (!file) return false;

    if (
      !ALLOWED_TYPES.includes(file.type)
    ) {

      toast.error(
        "Only JPG, PNG and WEBP images are allowed."
      );

      return false;

    }

    if (
      file.size >
      MAX_IMAGE_SIZE
    ) {

      toast.error(
        "Maximum image size is 5 MB."
      );

      return false;

    }

    return true;

  };

  const updateImage = (
    file
  ) => {

    if (!validateImage(file))
      return;

    if (
      preview &&
      preview.startsWith("blob:")
    ) {

      URL.revokeObjectURL(preview);

    }

    setImageFile(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  const handleImageChange = (
    event
  ) => {

    const file =
      event.target.files?.[0];

    updateImage(file);

    event.target.value = "";

  };

  const handleDrop = (
    event
  ) => {

    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    updateImage(file);

  };

  const removeImage = () => {

    if (
      preview &&
      preview.startsWith("blob:")
    ) {

      URL.revokeObjectURL(preview);

    }

    setPreview("");

    setImageFile(null);

  };

  const imageSource =
    preview
      ? preview.startsWith("blob:")
        ? preview
        : getImageUrl(preview)
      : null;

  return (

    <div className="space-y-6">

      {/* =========================================== */}
      {/* Upload */}
      {/* =========================================== */}

      <div
        onClick={() =>
          inputRef.current?.click()
        }
        onDrop={handleDrop}
        onDragOver={(event) =>
          event.preventDefault()
        }
        className="
          group
          cursor-pointer
          rounded-[28px]
          border-2
          border-dashed
          border-orange-300
          bg-gradient-to-br
          from-orange-50
          via-white
          to-orange-50
          px-6
          py-12
          text-center
          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-orange-500
          hover:shadow-xl

          sm:px-10
          sm:py-16
        "
      >

        <UploadCloud
          size={56}
          className="mx-auto text-orange-500"
        />

        <h3 className="mt-5 text-xl font-bold">

          Upload Category Image

        </h3>

        <p className="mt-3 text-sm text-gray-500">

          Click or drag your image here

        </p>

        <p className="mt-2 text-xs text-gray-400">

          JPG • PNG • WEBP

          <br />

          Maximum 5 MB

        </p>

      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleImageChange}
      />

      {/* =========================================== */}
      {/* Preview */}
      {/* =========================================== */}

      {imageSource && (

        <div className="mt-10">

          <div className="mb-5 flex items-center gap-2">

            <ImageIcon
              size={20}
              className="text-orange-500"
            />

            <h3 className="text-lg font-bold">

              Image Preview

            </h3>

          </div>

          <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-sm">

            <div className="overflow-hidden bg-gray-100">

              <img
                src={imageSource}
                alt="Category"
                className="h-56 w-full object-cover transition duration-500 hover:scale-105 sm:h-72 lg:h-80"
              />

            </div>

            <div className="flex justify-end bg-gray-50 p-5">

              <button
                type="button"
                onClick={removeImage}
                className="inline-flex items-center gap-2 rounded-2xl bg-red-100 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
              >

                <Trash2 size={18} />

                Remove Image

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default CategoryImageUploader;