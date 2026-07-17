import { useEffect } from "react";

import {
  ShoppingBag,
  IndianRupee,
  Package,
  Users,
  Star,
  Clock3,
  CalendarClock,
  ArrowUpRight,
} from "lucide-react";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

import AdminHero from "../components/AdminHero";
import AdminSectionHeader from "../components/AdminSectionHeader";
import AdminSectionCard from "../components/AdminSectionCard";
import DashboardCard from "../components/DashboardCard";

const Analytics = () => {
  const {
    analytics,
    loading,
    error,
    fetchAnalytics,
  } = useAdmin();

  useEffect(() => {

    fetchAnalytics();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading.analytics) {

    return <LoadingSpinner text="Crunching the numbers..." />;

  }

  if (error.analytics) {

    return (

      <ErrorState
        title="Unable to load analytics"
        description={error.analytics}
        onRetry={fetchAnalytics}
      />

    );

  }

  if (!analytics) {

    return (

      <ErrorState
        title="No Analytics Available"
        description="Analytics data is currently unavailable."
        onRetry={fetchAnalytics}
      />

    );

  }

  const revenue = Number(analytics.total_revenue || 0).toLocaleString();

  const totalOrders = analytics.total_orders || 0;

  const todayOrders = analytics.today_orders || 0;

  const pendingOrders = analytics.pending_orders || 0;

  const pendingRate =
    totalOrders === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (pendingOrders / totalOrders) * 100
          )
        );

  const todayRate =
    totalOrders === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (todayOrders / totalOrders) * 100
          )
        );

  return (

    <section className="space-y-8 lg:space-y-10">

      {/* ================================================= */}
      {/* Hero */}
      {/* ================================================= */}

      <AdminHero
        badge="📊 Bake N Bite Admin"
        title="Analytics"
        description="Monitor revenue, orders, customers and reviews, and understand how your business is growing at a glance."
        stats={[
          { label: "Total Customers", value: analytics.total_customers },
          { label: "Total Reviews", value: analytics.total_reviews },
        ]}
        buttonText="View Reviews"
        buttonIcon={<Star size={20} />}
        buttonTo="/admin/reviews"
      />

      {/* ================================================= */}
      {/* KPI Grid */}
      {/* ================================================= */}

      <div>
        <AdminSectionHeader
          title="Business Overview"
          description="Key performance indicators across your entire store."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">

          <DashboardCard
            title="Revenue"
            value={`₹${revenue}`}
            subtitle="Total Revenue"
            color="green"
            icon={<IndianRupee size={28} />}
          />

          <DashboardCard
            title="Orders"
            value={totalOrders}
            subtitle="Overall Orders"
            color="orange"
            icon={<ShoppingBag size={28} />}
          />

          <DashboardCard
            title="Today"
            value={todayOrders}
            subtitle="Orders Today"
            color="blue"
            icon={<CalendarClock size={28} />}
          />

          <DashboardCard
            title="Pending"
            value={pendingOrders}
            subtitle="Need Attention"
            color="yellow"
            icon={<Clock3 size={28} />}
          />

          <DashboardCard
            title="Customers"
            value={analytics.total_customers}
            subtitle="Registered Users"
            color="purple"
            icon={<Users size={28} />}
          />

          <DashboardCard
            title="Products"
            value={analytics.total_products}
            subtitle="Available Products"
            color="teal"
            icon={<Package size={28} />}
          />

          <DashboardCard
            title="Reviews"
            value={analytics.total_reviews}
            subtitle="Customer Reviews"
            color="red"
            icon={<Star size={28} />}
          />

        </div>
      </div>

      {/* ================================================= */}
      {/* Insights */}
      {/* ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        <AdminSectionCard
          title="Order Breakdown"
          description="How today's activity compares to your full order pipeline."
        >
          <div className="space-y-7">

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">
                  Today's Orders
                </span>

                <span className="font-black text-gray-900">
                  {todayOrders} / {totalOrders}
                </span>
              </div>

              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${todayRate}%` }}
                />
              </div>

              <p className="mt-2 text-xs font-medium text-gray-400">
                {todayRate}% of all orders came in today.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">
                  Pending Orders
                </span>

                <span className="font-black text-gray-900">
                  {pendingOrders} / {totalOrders}
                </span>
              </div>

              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${pendingRate}%` }}
                />
              </div>

              <p className="mt-2 text-xs font-medium text-gray-400">
                {pendingRate}% of orders are still waiting to be fulfilled.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-green-50 px-5 py-4">
              <span className="text-sm font-medium text-gray-600">
                Total Revenue
              </span>

              <span className="text-lg font-black text-green-600">
                ₹{revenue}
              </span>
            </div>

          </div>
        </AdminSectionCard>

        <div
          className="
            relative
            overflow-hidden
            rounded-[34px]
            bg-gradient-to-br
            from-orange-500
            via-orange-400
            to-amber-400
            p-6
            text-white
            shadow-xl

            sm:p-8
          "
        >
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-white/10" />

          <div className="relative">
            <h2 className="text-2xl font-black sm:text-3xl">
              Platform Snapshot
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-orange-50 sm:text-base">
              A quick look at everything customers can see and interact
              with across Bake N Bite.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-2xl font-black sm:text-3xl">
                  {analytics.total_products}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-orange-50 sm:text-sm">
                  Products
                  <ArrowUpRight size={12} />
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-2xl font-black sm:text-3xl">
                  {analytics.total_customers}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-orange-50 sm:text-sm">
                  Customers
                  <ArrowUpRight size={12} />
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-2xl font-black sm:text-3xl">
                  {analytics.total_reviews}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-orange-50 sm:text-sm">
                  Reviews
                  <ArrowUpRight size={12} />
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </section>

  );

};

export default Analytics;
