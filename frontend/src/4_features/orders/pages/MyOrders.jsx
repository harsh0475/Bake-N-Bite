// src/4_features/orders/pages/MyOrders.jsx
import { useEffect } from "react";
import { Package } from "lucide-react";

import useOrders from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";

import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import EmptyState from "../../../3_components/common/EmptyState";

const MyOrders = () => {
  const { orders, loading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <LoadingSpinner text="Fetching your orders..." />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "My Orders" },
          ]}
        />

        <div className="mb-8 flex items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-sm lg:px-6 lg:py-5">
          <div>
            <h1 className="text-2xl font-black text-gray-900 lg:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track and review all your previous orders.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            <Package size={20} />
            {orders.length} Order{orders.length !== 1 ? "s" : ""}
          </div>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            title="No Orders Yet"
            description="Start ordering delicious homemade food and your orders will show up here."
            buttonText="Browse Menu"
            onButtonClick={() => (window.location.href = "/products")}
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default MyOrders;