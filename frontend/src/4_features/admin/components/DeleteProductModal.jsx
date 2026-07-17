import { useEffect } from "react";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

const DeleteProductModal = ({
  isOpen,
  product,
  loading,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (!isOpen || loading) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    isOpen,
    loading,
    onClose,
  ]);

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-[32px]
          bg-white
          shadow-2xl
          animate-in
          zoom-in-95
          fade-in
          duration-200
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-orange-100 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-red-100 p-3">
              <AlertTriangle
                size={28}
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-900">
                Delete Product
              </h2>

              <p className="text-sm text-gray-500">
                This action is permanent.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-gray-500
              transition

              hover:bg-gray-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-6 px-6 py-8 sm:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm leading-7 text-gray-700">
              You are about to permanently delete
            </p>

            <h3 className="mt-2 break-words text-2xl font-black text-red-600">
              {product.name}
            </h3>

            <p className="mt-4 text-sm leading-7 text-red-600">
              This will permanently remove the product and
              cannot be undone.
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-4">
            <p className="text-sm leading-6 text-orange-700">
              Images, product information and display settings
              associated with this product may also be removed.
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-orange-100 px-6 py-5 sm:flex-row sm:px-8">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-gray-300
              px-5
              py-3.5
              font-semibold
              transition

              hover:bg-gray-100

              disabled:opacity-60
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              onConfirm(product.id)
            }
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-red-600
              px-5
              py-3.5
              font-bold
              text-white
              transition

              hover:bg-red-700

              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;