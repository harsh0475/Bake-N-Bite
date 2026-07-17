import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  UploadCloud,
  ImagePlus,
} from "lucide-react";

import { toast } from "react-toastify";

import ImagePreviewCard from "./ImagePreviewCard";

const MAX_IMAGES = 10;

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ProductImageUploader = ({
  images = [],
  onChange,
}) => {
  const inputRef = useRef(null);

  const previews = useMemo(() => {
    return images.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [images]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) =>
        URL.revokeObjectURL(preview.url)
      );
    };
  }, [previews]);

  // =======================================
  // Validation
  // =======================================

  const validateFiles = (files) => {
    const valid = [];

    for (const file of files) {

      if (!ALLOWED_TYPES.includes(file.type)) {

        toast.error(
          `${file.name} is not a supported image.`
        );

        continue;

      }

      if (file.size > MAX_SIZE) {

        toast.error(
          `${file.name} exceeds 5 MB.`
        );

        continue;

      }

      const duplicate = images.some(
        (existing) =>
          existing.name === file.name &&
          existing.size === file.size
      );

      if (duplicate) {

        toast.warning(
          `${file.name} already selected.`
        );

        continue;

      }

      valid.push(file);

    }

    return valid;
  };

  // =======================================
  // Add Images
  // =======================================

  const addImages = (fileList) => {

    if (!fileList) return;

    const files = validateFiles(
      Array.from(fileList)
    );

    const updated = [
      ...images,
      ...files,
    ];

    if (updated.length > MAX_IMAGES) {

      toast.warning(
        `Maximum ${MAX_IMAGES} images allowed.`
      );

      onChange(
        updated.slice(
          0,
          MAX_IMAGES
        )
      );

      return;

    }

    onChange(updated);

  };

  // =======================================
  // Drag
  // =======================================

  const handleDrop = (event) => {

    event.preventDefault();

    addImages(event.dataTransfer.files);

  };

  const handleDragOver = (event) => {

    event.preventDefault();

  };

  // =======================================
  // Delete
  // =======================================

  const handleDelete = (index) => {

    const updated = [...images];

    updated.splice(index, 1);

    onChange(updated);

  };

  // =======================================
  // Primary
  // =======================================

  const handlePrimary = (index) => {

    if (index === 0) return;

    const updated = [...images];

    const [image] = updated.splice(
      index,
      1
    );

    updated.unshift(image);

    onChange(updated);

  };

  return (

    <div className="space-y-6">

      {/* ====================================================== */}
      {/* Upload Area */}
      {/* ====================================================== */}

      <div
        onClick={() =>
          inputRef.current?.click()
        }
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="
          group
          cursor-pointer
          rounded-[34px]
          border-2
          border-dashed
          border-orange-300
          bg-gradient-to-br
          from-orange-50
          via-white
          to-orange-50
          p-6
          text-center
          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-orange-500
          hover:shadow-xl

          sm:p-8

          lg:p-10
        "
      >

        <UploadCloud
          size={54}
          className="mx-auto text-orange-500"
        />

        <h3 className="mt-4 text-xl font-bold">

          Upload Product Images

        </h3>

        <p className="mt-3 text-sm text-gray-600">

          Click or drag images here

        </p>

        <div className="mt-5 space-y-1 text-xs text-gray-500 sm:text-sm">

          <p>JPG • PNG • WEBP</p>

          <p>Maximum 5 MB per image</p>

          <p>Maximum 10 images</p>

          <p className="font-medium text-orange-600">

            First image becomes the primary image

          </p>

        </div>

      </div>

      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={(event) => {

          addImages(
            event.target.files
          );

          event.target.value = "";

        }}
      />

      {/* ====================================================== */}
      {/* Selected Images */}
      {/* ====================================================== */}

      {previews.length > 0 && (

        <>

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-2">

              <ImagePlus
                size={20}
                className="text-orange-500"
              />

              <h3 className="text-lg font-bold">

                Selected Images

              </h3>

            </div>

            <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">

              {previews.length} / {MAX_IMAGES}

            </span>

          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5

              sm:grid-cols-2

              lg:grid-cols-3

              2xl:grid-cols-4
            "
          >

            {previews.map(
              (
                preview,
                index
              ) => (

                <ImagePreviewCard
                  key={preview.url}
                  image={preview.url}
                  isPrimary={index === 0}
                  onDelete={() =>
                    handleDelete(index)
                  }
                  onPrimary={() =>
                    handlePrimary(index)
                  }
                />

              )
            )}

          </div>

        </>

      )}

    </div>

  );
};

export default ProductImageUploader;