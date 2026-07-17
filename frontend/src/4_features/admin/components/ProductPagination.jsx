import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductPagination = ({
  page,
  totalPages,
  onPageChange,
}) => {

  if (totalPages <= 1) {
    return null;
  }

  return (

    <div
      className="
        mt-8
        rounded-3xl
        border
        border-orange-100
        bg-white
        p-5
        shadow-lg

        sm:p-6
      "
    >

      <div
        className="
          flex
          flex-col
          gap-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* ====================================================== */}
        {/* Previous */}
        {/* ====================================================== */}

        <button
          type="button"
          disabled={page === 1}
          onClick={() =>
            onPageChange(page - 1)
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-orange-200
            bg-orange-50
            px-5
            py-3
            font-semibold
            text-orange-600
            transition-all

            hover:bg-orange-500
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >

          <ChevronLeft size={18} />

          Previous

        </button>

        {/* ====================================================== */}
        {/* Page Indicator */}
        {/* ====================================================== */}

        <div className="text-center">

          <p className="text-sm text-gray-500">

            Current Page

          </p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2">

            <span className="text-xl font-black text-orange-600">

              {page}

            </span>

            <span className="text-gray-500">

              /

            </span>

            <span className="font-bold text-gray-700">

              {totalPages}

            </span>

          </div>

        </div>

        {/* ====================================================== */}
        {/* Next */}
        {/* ====================================================== */}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-orange-500
            px-5
            py-3
            font-semibold
            text-white
            shadow-md
            transition-all

            hover:bg-orange-600

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >

          Next

          <ChevronRight size={18} />

        </button>

      </div>

    </div>

  );

};

export default ProductPagination;