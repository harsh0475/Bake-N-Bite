import ReviewRow from "./ReviewRow";

const ReviewTable = ({
  reviews,
  onReply,
  onHide,
  onShow,
  onDelete,
}) => {
  return (

    <>

      {/* ====================================================== */}
      {/* Mobile Cards */}
      {/* ====================================================== */}

      <div className="space-y-4 lg:hidden">

        {reviews.map((review) => (

          <ReviewRow
            key={review.id}
            review={review}
            onReply={onReply}
            onHide={onHide}
            onShow={onShow}
            onDelete={onDelete}
            mobile
          />

        ))}

      </div>

      {/* ====================================================== */}
      {/* Desktop Table */}
      {/* ====================================================== */}

      <div className="hidden overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-xl lg:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            {/* ====================================================== */}
            {/* Header */}
            {/* ====================================================== */}

            <thead className="bg-gradient-to-r from-orange-50 to-amber-50">

              <tr>

                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Product
                </th>

                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Rating
                </th>

                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Review
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Purchase
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Visibility
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Date
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            {/* ====================================================== */}
            {/* Body */}
            {/* ====================================================== */}

            <tbody className="divide-y divide-orange-50 bg-white">

              {reviews.map((review) => (

                <ReviewRow
                  key={review.id}
                  review={review}
                  onReply={onReply}
                  onHide={onHide}
                  onShow={onShow}
                  onDelete={onDelete}
                />

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );
};

export default ReviewTable;
