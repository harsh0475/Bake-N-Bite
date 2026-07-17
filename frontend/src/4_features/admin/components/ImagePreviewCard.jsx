import {
  Trash2,
  Star,
  CheckCircle2,
} from "lucide-react";

const ImagePreviewCard = ({
  image,
  isPrimary,
  onDelete,
  onPrimary,
}) => {
  return (

    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-orange-100
        bg-white
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* ====================================================== */}
      {/* Image */}
      {/* ====================================================== */}

      <div className="relative aspect-square overflow-hidden bg-gray-100">

        <img
          src={image}
          alt="Product"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

        {isPrimary && (

          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-orange-500 px-3 py-2 text-xs font-bold text-white shadow-lg">

            <CheckCircle2 size={14} />

            Primary

          </div>

        )}

      </div>

      {/* ====================================================== */}
      {/* Footer */}
      {/* ====================================================== */}

      <div className="space-y-3 p-4">

        <button
          type="button"
          onClick={onPrimary}
          disabled={isPrimary}
          className={`
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            px-4
            py-3
            text-sm
            font-semibold
            transition

            ${
              isPrimary
                ? "cursor-default bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white"
            }
          `}
        >

          <Star size={18} />

          {isPrimary
            ? "Primary Image"
            : "Make Primary"}

        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-red-100
            px-4
            py-3
            text-sm
            font-semibold
            text-red-600
            transition

            hover:bg-red-500
            hover:text-white
          "
        >

          <Trash2 size={18} />

          Delete Image

        </button>

      </div>

    </div>

  );
};

export default ImagePreviewCard;