import { useEffect } from "react";
import {
  ShoppingBag,
  IndianRupee,
  Package,
  Users,
  Layers3,
  Clock3,
  CircleCheckBig,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";

import DashboardCard from "../components/DashboardCard";
import AdminHero from "../components/AdminHero";
import AdminSectionHeader from "../components/AdminSectionHeader";
import AdminSectionCard from "../components/AdminSectionCard";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

const quickActions = [
  {
    title: "Orders",
    description: "Manage customer orders",
    link: "/admin/orders",
  },
  {
    title: "Products",
    description: "Manage all products",
    link: "/admin/products",
  },
  {
    title: "Categories",
    description: "Manage categories",
    link: "/admin/categories",
  },
  {
    title: "Customers",
    description: "View registered users",
    link: "/admin/customers",
  },
];

const Dashboard = () => {
  const {
    dashboard,
    loading,
    error,
    fetchDashboard,
  } = useAdmin();

  useEffect(() => {
    fetchDashboard();

    // eslint-disable-next-line
  }, []);

  if (loading.dashboard) {
    return <LoadingSpinner text="Fetching dashboard data..." />;
  }

  if (error.dashboard) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        description={error.dashboard}
        onRetry={fetchDashboard}
      />
    );
  }

  if (!dashboard) {
    return (
      <ErrorState
        title="No dashboard data"
        description="Dashboard data could not be found."
        onRetry={fetchDashboard}
      />
    );
  }

  const revenue = Number(dashboard.total_revenue || 0).toLocaleString();

  return (
    <section className="space-y-8 lg:space-y-10">

      {/* ================================================= */}
      {/* Hero */}
      {/* ================================================= */}

      <AdminHero
        badge="🍰 Bake N Bite Admin"
        title="Dashboard"
        description="Welcome back. Here's a live overview of today's business — orders, revenue, products and customers, all in one place."
        stats={[
          { label: "Total Revenue", value: `₹${revenue}` },
          { label: "Pending Orders", value: dashboard.pending_orders ?? 0 },
        ]}
        buttonText="View Orders"
        buttonIcon={<ShoppingBag size={20} />}
        buttonTo="/admin/orders"
      />

      {/* ================================================= */}
      {/* Statistics */}
      {/* ================================================= */}

      <div>
        <AdminSectionHeader
          title="Business Overview"
          description="A quick snapshot of how the store is performing right now."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">

          <DashboardCard
            title="Orders"
            value={dashboard.total_orders}
            subtitle="Overall Orders"
            color="orange"
            icon={<ShoppingBag size={28} />}
          />

          <DashboardCard
            title="Revenue"
            value={`₹${revenue}`}
            subtitle="Business Revenue"
            color="green"
            icon={<IndianRupee size={28} />}
          />

          <DashboardCard
            title="Products"
            value={dashboard.total_products}
            subtitle="Available Products"
            color="blue"
            icon={<Package size={28} />}
          />

          <DashboardCard
            title="Customers"
            value={dashboard.total_users}
            subtitle="Registered Users"
            color="purple"
            icon={<Users size={28} />}
          />

          <DashboardCard
            title="Categories"
            value={dashboard.total_categories}
            subtitle="Food Categories"
            color="teal"
            icon={<Layers3 size={28} />}
          />

          <DashboardCard
            title="Pending"
            value={dashboard.pending_orders}
            subtitle="Need Attention"
            color="yellow"
            icon={<Clock3 size={28} />}
          />

          <DashboardCard
            title="Delivered"
            value={dashboard.completed_orders}
            subtitle="Completed"
            color="green"
            icon={<CircleCheckBig size={28} />}
          />

        </div>
      </div>

      {/* ================================================= */}
      {/* Quick Actions */}
      {/* ================================================= */}

      <AdminSectionCard
        title="Quick Actions"
        description="Jump straight into the areas you manage most often."
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {quickActions.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="
                group
                flex
                flex-col
                justify-between
                rounded-3xl
                border
                border-orange-100
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-orange-200
                hover:shadow-xl

                sm:p-6
              "
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500 sm:mt-3">
                  {item.description}
                </p>
              </div>

              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-orange-600
                "
              >
                Open

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </AdminSectionCard>

      {/* ================================================= */}
      {/* Business Snapshot */}
      {/* ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        <AdminSectionCard title="Order Summary">
          <div className="space-y-4">

            <div className="flex items-center justify-between rounded-2xl bg-orange-50/60 px-5 py-4">
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Total Revenue
              </span>

              <span className="text-lg font-black text-green-600 sm:text-xl">
                ₹{revenue}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-orange-50/60 px-5 py-4">
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Total Orders
              </span>

              <span className="text-lg font-black text-gray-900 sm:text-xl">
                {dashboard.total_orders}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-orange-50/60 px-5 py-4">
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Pending Orders
              </span>

              <span className="text-lg font-black text-amber-600 sm:text-xl">
                {dashboard.pending_orders}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-orange-50/60 px-5 py-4">
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Completed Orders
              </span>

              <span className="text-lg font-black text-green-600 sm:text-xl">
                {dashboard.completed_orders}
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
              Bake N Bite
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-orange-50 sm:text-base">
              Continue delivering delicious homemade food with a beautiful
              customer experience.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-3xl font-black sm:text-4xl">
                  {dashboard.total_products}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-orange-50">
                  Products
                  <ArrowUpRight size={14} />
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <p className="text-3xl font-black sm:text-4xl">
                  {dashboard.total_categories}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-orange-50">
                  Categories
                  <ArrowUpRight size={14} />
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Dashboard;
