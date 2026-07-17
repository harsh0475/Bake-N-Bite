import {
  Eye,
  EyeOff,
  MessageCircle,
  Trash2,
  BadgeCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import RatingStars from "./RatingStars";

const ReviewRow = ({
  review,
  onReply,
  onHide,
  onShow,
  onDelete,
  mobile = false,
}) => {

  if (mobile) {

    return (

      <div
        className="
          rounded-[30px]
          border
          border-orange-100
          bg-white
          p-5
          shadow-lg
        "
      >

        <div className="flex items-start gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700">

            {review.user.full_name?.charAt(0)}

          </div>

          <div className="min-w-0 flex-1">

            <h3 className="truncate font-black text-gray-900">

              {review.user.full_name}

            </h3>

            <p className="truncate text-sm text-gray-500">

              {review.product_name}

            </p>

          </div>

          <div className="flex flex-col items-end shrink-0">

            <RatingStars rating={review.rating} />

            <span className="mt-1 text-xs font-semibold text-gray-500">

              {review.rating}/5

            </span>

          </div>

        </div>

        <div className="mt-4">

          <h4 className="font-semibold text-gray-900">

            {review.title || "No Title"}

          </h4>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">

            {review.comment}

          </p>

          {review.admin_reply && (

            <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3">

              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                Admin Reply
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {review.admin_reply}
              </p>

            </div>

          )}

        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          {review.is_verified_purchase ? (

            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

              <BadgeCheck size={13} />

              Verified

            </span>

          ) : (

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

              Normal

            </span>

          )}

          {review.is_visible ? (

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

              Visible

            </span>

          ) : (

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

              Hidden

            </span>

          )}

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">

            {new Date(review.created_at).toLocaleDateString()}

          </span>

        </div>

        <div className="mt-5 grid grid-cols-4 gap-2 border-t border-orange-50 pt-4">

          <button
            onClick={() => onReply(review)}
            className="flex items-center justify-center rounded-xl bg-orange-100 py-2.5 text-orange-600 transition hover:bg-orange-500 hover:text-white"
            title="Reply"
          >
            <MessageCircle size={18} />
          </button>

          <Link
            to={`/admin/reviews/${review.id}`}
            className="flex items-center justify-center rounded-xl bg-teal-100 py-2.5 text-teal-600 transition hover:bg-teal-500 hover:text-white"
            title="View Details"
          >
            <Eye size={18} />
          </Link>

          {review.is_visible ? (

            <button
              onClick={() => onHide(review.id)}
              className="flex items-center justify-center rounded-xl bg-yellow-100 py-2.5 text-yellow-700 transition hover:bg-yellow-500 hover:text-white"
              title="Hide"
            >
              <EyeOff size={18} />
            </button>

          ) : (

            <button
              onClick={() => onShow(review.id)}
              className="flex items-center justify-center rounded-xl bg-green-100 py-2.5 text-green-700 transition hover:bg-green-500 hover:text-white"
              title="Show"
            >
              <Eye size={18} />
            </button>

          )}

          <button
            onClick={() => onDelete(review)}
            className="flex items-center justify-center rounded-xl bg-red-100 py-2.5 text-red-600 transition hover:bg-red-500 hover:text-white"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    );

  }

  return (
    <tr className="transition duration-200 hover:bg-orange-50">

      {/* ====================================================== */}
      {/* Product */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div>

          <h3 className="font-semibold text-gray-900">
            {review.product_name}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Review #{review.id}
          </p>

        </div>

      </td>

      {/* ====================================================== */}
      {/* Customer */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700">

            {review.user.full_name?.charAt(0)}

          </div>

          <div>

            <p className="font-semibold text-gray-900">
              {review.user.full_name}
            </p>

            <p className="text-sm text-gray-500">
              {review.user.email}
            </p>

          </div>

        </div>

      </td>

      {/* ====================================================== */}
      {/* Rating */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="flex flex-col items-center">

          <RatingStars
            rating={review.rating}
          />

          <span className="mt-1 text-sm font-semibold text-gray-600">
            {review.rating}/5
          </span>

        </div>

      </td>

      {/* ====================================================== */}
      {/* Review */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="max-w-sm">

          <h4 className="font-semibold text-gray-900">
            {review.title || "No Title"}
          </h4>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
            {review.comment}
          </p>

          {review.admin_reply && (

            <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3">

              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                Admin Reply
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {review.admin_reply}
              </p>

            </div>

          )}

        </div>

      </td>

      {/* ====================================================== */}
      {/* Purchase */}
      {/* ====================================================== */}

      <td className="px-6 py-5 text-center">

        {review.is_verified_purchase ? (

          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

            <BadgeCheck size={14} />

            Verified

          </span>

        ) : (

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

            Normal

          </span>

        )}

      </td>

      {/* ====================================================== */}
      {/* Visibility */}
      {/* ====================================================== */}

      <td className="px-6 py-5 text-center">

        {review.is_visible ? (

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

            Visible

          </span>

        ) : (

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

            Hidden

          </span>

        )}

      </td>

      {/* ====================================================== */}
      {/* Date */}
      {/* ====================================================== */}

      <td className="px-6 py-5 text-center text-sm text-gray-600">

        {new Date(
          review.created_at
        ).toLocaleDateString()}

      </td>

      {/* ====================================================== */}
      {/* Actions */}
      {/* ====================================================== */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-2">

          <button
            onClick={() => onReply(review)}
            className="rounded-xl bg-orange-100 p-2.5 text-orange-600 transition hover:bg-orange-500 hover:text-white"
            title="Reply"
          >
            <MessageCircle size={18} />
          </button>

          <Link
            to={`/admin/reviews/${review.id}`}
            className="rounded-xl bg-teal-100 p-2.5 text-teal-600 transition hover:bg-teal-500 hover:text-white"
            title="View Details"
          >
            <Eye size={18} />
          </Link>

          {review.is_visible ? (

            <button
              onClick={() =>
                onHide(review.id)
              }
              className="rounded-xl bg-yellow-100 p-2.5 text-yellow-700 transition hover:bg-yellow-500 hover:text-white"
              title="Hide"
            >
              <EyeOff size={18} />
            </button>

          ) : (

            <button
              onClick={() =>
                onShow(review.id)
              }
              className="rounded-xl bg-green-100 p-2.5 text-green-700 transition hover:bg-green-500 hover:text-white"
              title="Show"
            >
              <Eye size={18} />
            </button>

          )}

          <button
            onClick={() =>
              onDelete(review)
            }
            className="rounded-xl bg-red-100 p-2.5 text-red-600 transition hover:bg-red-500 hover:text-white"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default ReviewRow;
