import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const OrderCard = ({ order }) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Preparing: "bg-orange-100 text-orange-700",
    OutForDelivery: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <Link
      to={`/orders/${order.id}`}
      className="
        group
        block
        rounded-2xl
        border
        border-orange-100
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        lg:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Order Number
          </p>

          <h2 className="mt-1 truncate text-lg font-black text-gray-900 lg:text-2xl">
            {order.order_number}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(order.created_at).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          <div className="mt-4 flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-500">
                Grand Total
              </p>

              <h3 className="text-2xl font-black text-orange-500">
                ₹{order.grand_total}
              </h3>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusColors[order.status] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </span>

          </div>

        </div>

        <ChevronRight
          size={22}
          className="
            mt-2
            shrink-0
            text-gray-400
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />

      </div>
    </Link>
  );
};

export default OrderCard;