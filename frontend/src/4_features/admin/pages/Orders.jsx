import {
  useEffect,
} from "react";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";

import OrderTable from "../components/OrderTable";

const Orders = () => {

  const {
    orders,
    loading,
    error,
    fetchOrders,
  } = useAdmin();

  useEffect(() => {

    fetchOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  if (loading.orders) {

    return (
      <section className="flex min-h-[70vh] items-center justify-center">

        <LoadingSpinner />

      </section>
    );

  }

  if (error.orders) {

    return (

      <section className="py-20">

        <ErrorState
          title="Unable to load orders"
          description={error.orders}
        />

      </section>

    );

  }

  return (

    <section className="space-y-10">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 px-8 py-10 text-white shadow-2xl">

        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />

        <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-8">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">

              📦 Order Management

            </span>

            <h1 className="mt-6 text-5xl font-black">

              Customer Orders

            </h1>

            <p className="mt-4 max-w-2xl text-orange-100">

              View, manage and update every order placed by customers.

            </p>

          </div>

          <div className="rounded-3xl bg-white/20 px-8 py-6 backdrop-blur">

            <p className="text-4xl font-black">

              {orders.length}

            </p>

            <p className="text-sm">

              Total Orders

            </p>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Orders */}
      {/* ====================================================== */}

      <div className="overflow-hidden rounded-[34px] border border-orange-100 bg-white shadow-xl">

        <div className="border-b border-orange-100 px-8 py-6">

          <h2 className="text-2xl font-bold">

            Orders List

          </h2>

          <p className="mt-2 text-gray-500">

            Monitor and manage all customer orders from one place.

          </p>

        </div>

        <div className="p-6">

          {orders.length === 0 ? (

            <EmptyState
              title="No Orders"
              description="No customer orders have been placed yet."
            />

          ) : (

            <OrderTable
              orders={orders}
            />

          )}

        </div>

      </div>

    </section>

  );

};

export default Orders;