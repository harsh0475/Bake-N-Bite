import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

const ReviewModal = ({
  isOpen,
  product,
  existingReview,
  submitting,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating || 5);
      setTitle(existingReview.title || "");
      setComment(existingReview.comment || "");
    } else {
      setRating(5);
      setTitle("");
      setComment("");
    }
  }, [existingReview, isOpen]);

  if (!isOpen || !product) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      product_id: product.id,
      rating,
      title: title.trim() || null,
      comment: comment.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        <div className="flex items-start justify-between border-b border-orange-100 px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              {existingReview ? "Edit Your Review" : "Write a Review"}
            </h2>

            <p className="mt-1 text-gray-500">{product.name}</p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          <div>

            <p className="mb-2 font-semibold text-gray-800">
              Your Rating
            </p>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map((value) => (

                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition active:scale-95"
                >

                  <Star
                    size={32}
                    className={
                      value <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-100 text-gray-300"
                    }
                  />

                </button>

              ))}

            </div>

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-800">
              Title (optional)
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={150}
              placeholder="Sum up your experience"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-800">
              Your Review (optional)
            </label>

            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="Tell others what you thought about this dish..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400"
            />

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting..."
                : existingReview
                ? "Update Review"
                : "Submit Review"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ReviewModal;