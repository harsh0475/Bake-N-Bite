import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

import productPlaceholder from "../../../2_assets/images/product-placeholder.png";
import { API_BASE_URL } from "../../../8_constants/config";

const ProductGallery = ({
  images = [],
  productName,
}) => {

  const gallery =
    images.length > 0
      ? images.map((image) => ({
          ...image,
          image_url: image.image_url?.startsWith("http")
            ? image.image_url
            : `${API_BASE_URL}${image.image_url}`,
        }))
      : [
          {
            id: 0,
            image_url: productPlaceholder,
          },
        ];

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const currentImage =
    gallery[currentIndex];

  const previousImage = () => {

    setCurrentIndex((previous) =>
      previous === 0
        ? gallery.length - 1
        : previous - 1
    );

  };

  const nextImage = () => {

    setCurrentIndex((previous) =>
      previous === gallery.length - 1
        ? 0
        : previous + 1
    );

  };

  return (

    <div className="space-y-6">

      {/* ============================== */}
      {/* Main Image */}
      {/* ============================== */}

      <div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-white shadow-xl">

        <div className="group aspect-square overflow-hidden bg-orange-50">

          <img
            src={currentImage.image_url}
            alt={productName}
            loading="lazy"
            onError={(event) => {

              event.currentTarget.src =
                productPlaceholder;

            }}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        </div>

        {/* Zoom Icon */}

        <div className="absolute right-5 top-5 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur">

          <ZoomIn
            size={20}
            className="text-orange-500"
          />

        </div>

        {/* Previous */}

        {gallery.length > 1 && (

          <button
            type="button"
            onClick={previousImage}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-white/90
              p-3
              shadow-lg
              transition
              hover:scale-110
            "
          >

            <ChevronLeft size={20} />

          </button>

        )}

        {/* Next */}

        {gallery.length > 1 && (

          <button
            type="button"
            onClick={nextImage}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-white/90
              p-3
              shadow-lg
              transition
              hover:scale-110
            "
          >

            <ChevronRight size={20} />

          </button>

        )}

        {/* Counter */}

        {gallery.length > 1 && (

          <div className="absolute bottom-5 right-5 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">

            {currentIndex + 1}
            {" / "}
            {gallery.length}

          </div>

        )}

      </div>

      {/* ============================== */}
      {/* Thumbnail Gallery */}
      {/* ============================== */}

      {gallery.length > 1 && (

        <div className="flex gap-4 overflow-x-auto pb-2">

          {gallery.map(
            (
              image,
              index
            ) => {

              const active =
                index === currentIndex;

              return (

                <button
                  key={image.id}
                  type="button"
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border-2
                    transition-all
                    duration-300
                    ${
                      active
                        ? "scale-105 border-orange-500 shadow-xl"
                        : "border-gray-200 hover:border-orange-300"
                    }
                  `}
                >

                  <img
                    src={image.image_url}
                    alt={productName}
                    onError={(event) => {

                      event.currentTarget.src =
                        productPlaceholder;

                    }}
                    className="h-24 w-24 object-cover"
                  />

                </button>

              );

            }
          )}

        </div>

      )}

    </div>

  );

};

export default ProductGallery;