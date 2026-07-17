import {
  useEffect,
  useState,
} from "react";

const ReviewReplyModal = ({
  isOpen,
  review,
  loading,
  onClose,
  onSubmit,
}) => {
  const [
    reply,
    setReply,
  ] = useState("");

  useEffect(() => {
    if (review) {
      setReply(
        review.admin_reply || ""
      );
    }
  }, [review]);

  if (!isOpen || !review) {
    return null;
  }

  const handleSubmit = () => {
    onSubmit(
      review.id,
      reply
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">

        <div className="border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            Reply to Review
          </h2>

          <p className="mt-1 text-gray-500">
            {review.product_name}
          </p>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <p className="font-semibold">
              Customer Review
            </p>

            <div className="mt-2 rounded-xl bg-gray-50 p-4">

              <p className="font-medium">
                {review.title}
              </p>

              <p className="mt-2 text-gray-600">
                {review.comment}
              </p>

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Admin Reply
            </label>

            <textarea
              rows={6}
              value={reply}
              onChange={(e) =>
                setReply(
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
              placeholder="Write your reply..."
            />

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : "Save Reply"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReviewReplyModal;