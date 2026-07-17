import {
  Link,
} from "react-router-dom";

import {
  Eye,
  Calendar,
  IndianRupee,
} from "lucide-react";

// ======================================================
// Status Colors
// ======================================================

const getStatusColor = (
  status
) => {

  switch (status) {

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Confirmed":
      return "bg-blue-100 text-blue-700";

    case "Preparing":
      return "bg-orange-100 text-orange-700";

    case "Ready":
      return "bg-indigo-100 text-indigo-700";

    case "Out For Delivery":
      return "bg-purple-100 text-purple-700";

    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";

  }

};

const getPaymentColor = (
  status
) => {

  switch (status) {

    case "Paid":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Failed":
      return "bg-red-100 text-red-700";

    case "Refunded":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";

  }

};

const formatDate = (date) =>
  new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

const OrderTable = ({
  orders,
}) => {

  return (

    <>

      {/* ====================================================== */}
      {/* Mobile Cards */}
      {/* ====================================================== */}

      <div className="space-y-4 lg:hidden">

        {orders.map((order) => (

          <div
            key={order.id}
            className="rounded-[30px] border border-orange-100 bg-white p-5 shadow-lg"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">

                {order.delivery_name?.charAt(0)}

              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate font-black text-gray-900">

                  {order.order_number}

                </p>

                <p className="text-xs text-gray-400">

                  ID #{order.id}

                </p>

              </div>

            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-orange-50 px-4 py-3">

              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">

                Order Total

              </span>

              <div className="flex items-center gap-1 font-black text-orange-600">

                <IndianRupee size={16} />

                {Number(order.grand_total).toFixed(2)}

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusColor(
                  order.status
                )}`}
              >

                {order.status}

              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getPaymentColor(
                  order.payment_status
                )}`}
              >

                {order.payment_status}

              </span>

            </div>

            <div className="mt-4 flex items-center justify-between border-t border-orange-50 pt-4">

              <p className="font-semibold text-gray-700">

                {order.delivery_name}

              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">

                <Calendar size={15} />

                {formatDate(order.created_at)}

              </div>

            </div>

            <Link
              to={`/admin/orders/${order.id}`}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
            >

              <Eye size={18} />

              View Order

            </Link>

          </div>

        ))}

      </div>

      {/* ====================================================== */}
      {/* Desktop Table */}
      {/* ====================================================== */}

      <div className="hidden overflow-x-auto lg:block">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-orange-100 bg-orange-50">

              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-600">

                Order

              </th>

              <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-gray-600">

                Customer

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-600">

                Status

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-600">

                Payment

              </th>

              <th className="px-6 py-5 text-right text-sm font-bold uppercase tracking-wide text-gray-600">

                Total

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-600">

                Date

              </th>

              <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-gray-600">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b border-orange-50 transition hover:bg-orange-50/40"
              >

                {/* Order */}

                <td className="px-6 py-6">

                  <div>

                    <p className="font-bold text-gray-900">

                      {order.order_number}

                    </p>

                    <p className="mt-1 text-xs text-gray-400">

                      ID #{order.id}

                    </p>

                  </div>

                </td>

                {/* Customer */}

                <td className="px-6 py-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">

                      {order.delivery_name?.charAt(0)}

                    </div>

                    <div>

                      <p className="font-semibold">

                        {order.delivery_name}

                      </p>

                    </div>

                  </div>

                </td>

                {/* Status */}

                <td className="px-6 py-6 text-center">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >

                    {order.status}

                  </span>

                </td>

                {/* Payment */}

                <td className="px-6 py-6 text-center">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getPaymentColor(
                      order.payment_status
                    )}`}
                  >

                    {order.payment_status}

                  </span>

                </td>

                {/* Total */}

                <td className="px-6 py-6 text-right">

                  <div className="flex items-center justify-end gap-1 font-bold text-orange-600">

                    <IndianRupee size={16} />

                    {Number(order.grand_total).toFixed(2)}

                  </div>

                </td>

                {/* Date */}

                <td className="px-6 py-6">

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">

                    <Calendar size={16} />

                    {formatDate(order.created_at)}

                  </div>

                </td>

                {/* Action */}

                <td className="px-6 py-6">

                  <div className="flex justify-center">

                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:scale-105 hover:bg-orange-600"
                    >

                      <Eye size={18} />

                      View

                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

};

export default OrderTable;