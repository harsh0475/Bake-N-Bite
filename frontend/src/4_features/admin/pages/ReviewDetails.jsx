import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  ArrowLeft,
  MessageSquareText,
  MessageCircle,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

import RatingStars from "../components/RatingStars";
import DeleteReviewModal from "../components/DeleteReviewModal";

const ReviewDetails = () => {
  const { reviewId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    selectedReview,
    loading,
    error,

    fetchReview,
    replyReview,
    hideReview,
    showReview,
    deleteReview,
  } = useAdmin();

  const [
    reply,
    setReply,
  ] = useState("");

  const [
    deleteModal,
    setDeleteModal,
  ] = useState(false);

  useEffect(() => {
    loadReview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewId]);

  const loadReview =
    async () => {
      try {
        await fetchReview(
          reviewId
        );
      } catch {}
    };

  useEffect(() => {
    if (selectedReview) {
      setReply(
        selectedReview.admin_reply || ""
      );
    }
  }, [selectedReview]);

  const handleReply =
    async () => {
      try {

        await replyReview(
          reviewId,
          reply
        );

        toast.success(
          "Reply saved successfully."
        );

        loadReview();

      } catch (error) {

        toast.error(
          error ||
            "Unable to save reply."
        );

      }
    };

  const handleVisibility =
    async () => {
      try {

        if (
          selectedReview.is_visible
        ) {

          await hideReview(
            reviewId
          );

          toast.success(
            "Review hidden."
          );

        } else {

          await showReview(
            reviewId
          );

          toast.success(
            "Review is now visible."
          );

        }

        loadReview();

      } catch (error) {

        toast.error(
          error ||
            "Operation failed."
        );

      }
    };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const confirmDelete =
    async () => {
      try {

        await deleteReview(
          reviewId
        );

        toast.success(
          "Review deleted."
        );

        setDeleteModal(false);

        navigate(
          "/admin/reviews"
        );

      } catch (error) {

        toast.error(
          error ||
            "Unable to delete review."
        );

      }
    };

  if (loading.review) {
    return <LoadingSpinner />;
  }

  if (error.review) {
    return (
      <ErrorState
        title="Unable to load review"
        description={
          error.review
        }
      />
    );
  }

  if (!selectedReview) {
    return (
      <ErrorState
        title="Review not found"
        description="The requested review does not exist."
      />
    );
  }

  return (
    <div className="space-y-8">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 text-white shadow-2xl sm:p-8 lg:p-10">

        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />

        <div className="absolute bottom-0 right-32 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              ⭐ Review Details
            </span>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl lg:text-5xl">

              Review #{selectedReview.id}

            </h1>

            <p className="mt-3 text-sm text-orange-100 sm:text-base">

              {selectedReview.product_name}

            </p>

          </div>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-orange-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-2xl lg:w-auto"
          >
            <ArrowLeft size={20} />

            Back

          </button>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Review */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-700">

              {selectedReview.user.full_name?.charAt(0)}

            </div>

            <div>

              <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
                {
                  selectedReview.product_name
                }
              </h2>

              <p className="mt-1 text-gray-500">
                {
                  selectedReview.user.full_name
                }
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <RatingStars
              rating={
                selectedReview.rating
              }
            />

            <span className="font-bold text-gray-700">
              {selectedReview.rating}/5
            </span>

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-orange-50 p-5">

          <h3 className="font-semibold text-gray-900">
            Review Title
          </h3>

          <p className="mt-2 text-gray-700">
            {selectedReview.title || "No Title"}
          </p>

        </div>

        <div className="mt-5 rounded-2xl border border-orange-100 p-5">

          <h3 className="font-semibold text-gray-900">
            Customer Review
          </h3>

          <p className="mt-2 whitespace-pre-wrap leading-7 text-gray-600">
            {
              selectedReview.comment
            }
          </p>

        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
            selectedReview.is_verified_purchase
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}>
            {selectedReview.is_verified_purchase
              ? "Verified Purchase"
              : "Normal Review"}
          </span>

          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
            selectedReview.is_visible
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {selectedReview.is_visible
              ? "Visible"
              : "Hidden"}
          </span>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Reply */}
      {/* ====================================================== */}

      <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">

            <MessageSquareText size={22} />

          </div>

          <h2 className="text-xl font-black text-gray-900">
            Admin Reply
          </h2>

        </div>

        <textarea
          rows={6}
          value={reply}
          onChange={(e) =>
            setReply(
              e.target.value
            )
          }
          className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 px-4 py-3.5 text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-orange-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
          placeholder="Write your reply..."
        />

        <button
          onClick={
            handleReply
          }
          disabled={
            loading.replyReview
          }
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MessageCircle size={18} />

          {loading.replyReview
            ? "Saving..."
            : "Save Reply"}
        </button>

      </div>

      {/* ====================================================== */}
      {/* Actions */}
      {/* ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">

        <button
          onClick={
            handleVisibility
          }
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-teal-500 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-teal-600 sm:flex-none"
        >

          {selectedReview.is_visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}

          {selectedReview.is_visible
            ? "Hide Review"
            : "Show Review"}
        </button>

        <button
          onClick={
            handleDelete
          }
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-red-600 sm:flex-none"
        >
          <Trash2 size={18} />

          Delete Review
        </button>

      </div>

      <DeleteReviewModal
        isOpen={deleteModal}
        review={selectedReview}
        loading={
          loading.deleteReview
        }
        onClose={() =>
          setDeleteModal(false)
        }
        onConfirm={
          confirmDelete
        }
      />

    </div>
  );
};

export default ReviewDetails;
