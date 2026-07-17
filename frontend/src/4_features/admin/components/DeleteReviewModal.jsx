const DeleteReviewModal = ({
  isOpen,
  review,
  loading,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !review) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        <div className="p-6">

          <h2 className="text-2xl font-bold text-red-600">
            Delete Review
          </h2>

          <p className="mt-4 text-gray-600">
            Are you sure you want to permanently delete
            this review?
          </p>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">

            <p className="font-semibold">
              {review.product_name}
            </p>

            <p className="mt-2 text-gray-500">
              {review.comment}
            </p>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() =>
              onConfirm(
                review.id
              )
            }
            className="rounded-xl bg-red-500 px-6 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteReviewModal;