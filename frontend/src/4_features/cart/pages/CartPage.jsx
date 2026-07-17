// src/4_features/cart/pages/CartPage.jsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";

import Container from "../../../3_components/common/Container";
import Button from "../../../3_components/common/Button";
import PromoBanner from "../../../3_components/common/PromoBanner";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import Breadcrumb from "../../../3_components/common/Breadcrumb";

const CartPage = () => {
  const navigate = useNavigate();

  const {
    cart,
    loading,
    updating,
    error,
    fetchCart,
    updateItem,
    removeItem,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ======================================================
  // Loading
  // ======================================================

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-orange-50 py-24">
        <LoadingSpinner text="Fetching your cart..." />
      </section>
    );
  }

  // ======================================================
  // Error
  // ======================================================

  if (error) {
    return (
      <section className="bg-orange-50 py-16">
        <Container>
          <ErrorState
            title="Unable to load cart"
            description={error}
            onRetry={fetchCart}
          />
        </Container>
      </section>
    );
  }

  // ======================================================
  // Empty Cart
  // ======================================================

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
        />

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="🛒 Ready To Checkout"
          title="Shopping Cart"
          description="Review your delicious homemade selections before placing your order."
          stats={[
            { value: cart.total_items, label: "Items" },
            { value: `₹${Number(cart.grand_total).toFixed(0)}`, label: "Total" },
          ]}
        />

        <div className="my-8 flex justify-end">
          <Link to="/products">
            <Button variant="outline">← Continue Shopping</Button>
          </Link>
        </div>

        {/* Main Layout */}

        <div className="grid gap-10 xl:grid-cols-[1.8fr_420px]">
          {/* Left */}

          <div className="space-y-6">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={(id, quantity) => updateItem(id, quantity + 1)}
                onDecrease={(id, quantity) =>
                  quantity > 1 && updateItem(id, quantity - 1)
                }
                updating={updating}
                onRemove={(id) => {
                    if (!loading && !updating) {
                        removeItem(id);
                    }
                }}
              />
            ))}
          </div>

          {/* Right */}

          <div>
            <CartSummary cart={cart} onCheckout={() => navigate("/checkout")} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CartPage;