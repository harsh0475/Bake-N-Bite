import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Star,
  MessageSquare,
  Eye,
} from "lucide-react";

import { toast } from "react-toastify";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";

import ReviewTable from "../components/ReviewTable";
import ReviewReplyModal from "../components/ReviewReplyModal";
import DeleteReviewModal from "../components/DeleteReviewModal";

const Reviews = () => {
  const {
    reviews,
    loading,
    error,

    fetchReviews,
    replyReview,
    hideReview,
    showReview,
    deleteReview,
  } = useAdmin();

  const [search, setSearch] =
    useState("");

  const [
    selectedReview,
    setSelectedReview,
  ] = useState(null);

  const [
    replyModal,
    setReplyModal,
  ] = useState(false);

  const [
    deleteModal,
    setDeleteModal,
  ] = useState(false);

  useEffect(() => {
    loadReviews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadReviews =
    async () => {
      try {
        await fetchReviews();
      } catch {}
    };

  const filteredReviews =
    useMemo(() => {
      if (!search.trim()) {
        return reviews;
      }

      const keyword =
        search.toLowerCase();

      return reviews.filter(
        (review) =>
          review.product_name
            ?.toLowerCase()
            .includes(keyword) ||

          review.user.full_name
            ?.toLowerCase()
            .includes(keyword) ||

          review.title
            ?.toLowerCase()
            .includes(keyword) ||

          review.comment
            ?.toLowerCase()
            .includes(keyword)
      );
    }, [
      reviews,
      search,
    ]);

  const verifiedReviews =
    reviews.filter(
      (review) =>
        review.is_verified_purchase
    ).length;

  const visibleReviews =
    reviews.filter(
      (review) =>
        review.is_visible
    ).length;

  const averageRating =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  const handleReply = (
    review
  ) => {
    setSelectedReview(review);
    setReplyModal(true);
  };

  const handleDelete = (
    review
  ) => {
    setSelectedReview(review);
    setDeleteModal(true);
  };

  const submitReply =
    async (
      reviewId,
      adminReply
    ) => {
      try {
        await replyReview(
          reviewId,
          adminReply
        );

        toast.success(
          "Reply saved successfully."
        );

        setReplyModal(false);

        loadReviews();

      } catch (error) {
        toast.error(
          error ||
            "Unable to reply."
        );
      }
    };

  const handleHide =
    async (reviewId) => {
      try {
        await hideReview(
          reviewId
        );

        toast.success(
          "Review hidden."
        );

        loadReviews();
      } catch (error) {
        toast.error(
          error ||
            "Unable to hide review."
        );
      }
    };

  const handleShow =
    async (reviewId) => {
      try {
        await showReview(
          reviewId
        );

        toast.success(
          "Review is now visible."
        );

        loadReviews();
      } catch (error) {
        toast.error(
          error ||
            "Unable to show review."
        );
      }
    };

  const confirmDelete =
    async (reviewId) => {
      try {
        await deleteReview(
          reviewId
        );

        toast.success(
          "Review deleted."
        );

        setDeleteModal(false);

        loadReviews();

      } catch (error) {
        toast.error(
          error ||
            "Unable to delete review."
        );
      }
    };

  if (loading.reviews) {
    return <LoadingSpinner />;
  }

  if (error.reviews) {
    return (
      <ErrorState
        title="Unable to load reviews"
        description={
          error.reviews
        }
      />
    );
  }

  return (
    <div className="space-y-8">

      {/* ============================================== */}
      {/* Hero */}
      {/* ============================================== */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-10 text-white shadow-xl">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute bottom-0 right-32 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">

              ⭐ Customer Reviews

            </span>

            <h1 className="mt-6 text-5xl font-black">

              Reviews

            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-orange-50">

              Read customer feedback,
              respond to reviews,
              moderate visibility and
              improve customer experience.

            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <StatCard
              icon={<MessageSquare size={28} />}
              value={reviews.length}
              label="Reviews"
            />

            <StatCard
              icon={<Eye size={28} />}
              value={visibleReviews}
              label="Visible"
            />

            <StatCard
              icon={<Star size={28} />}
              value={averageRating}
              label="Average"
            />

          </div>

        </div>

      </div>

      {/* ============================================== */}
      {/* Search */}
      {/* ============================================== */}

      <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-lg sm:p-6">

        <div className="relative">

          <Search
            size={22}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-orange-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search product, customer or review..."
            className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 py-4 pl-14 pr-5 text-[15px] text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-orange-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:text-base"
          />

        </div>

      </div>

      {/* ============================================== */}
      {/* Table */}
      {/* ============================================== */}

      {filteredReviews.length === 0 ? (

        <EmptyState
          title="No Reviews"
          description="No customer reviews available."
        />

      ) : (

        <ReviewTable
          reviews={
            filteredReviews
          }
          onHide={
            handleHide
          }
          onShow={
            handleShow
          }
          onReply={
            handleReply
          }
          onDelete={
            handleDelete
          }
        />

      )}

      <ReviewReplyModal
        isOpen={replyModal}
        review={selectedReview}
        loading={
          loading.replyReview
        }
        onClose={() =>
          setReplyModal(false)
        }
        onSubmit={submitReply}
      />

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

const StatCard = ({
  icon,
  value,
  label,
}) => (
  <div className="rounded-3xl bg-white/20 px-6 py-5 backdrop-blur">

    <div className="mb-3">

      {icon}

    </div>

    <p className="text-3xl font-black">

      {value}

    </p>

    <p>

      {label}

    </p>

  </div>
);

export default Reviews;