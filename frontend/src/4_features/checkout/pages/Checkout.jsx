// src/4_features/checkout/pages/Checkout.jsx
import { useEffect, useState } from "react";
import {
  MapPin,
  CheckCircle2,
  Home,
  PlusCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../auth/hooks/useAuth";
import useCart from "../../cart/hooks/useCart";
import useAddress from "../../profile/hooks/useAddress";
import useCheckout from "../hooks/useCheckout";
import usePayment from "../../payment/hooks/usePayment";

import CheckoutSummary from "../components/CheckoutSummary";
import DeliveryMethod from "../components/DeliveryMethod";
import PaymentMethod from "../components/PaymentMethod";

import { processCheckout } from "../services/checkoutService";
import { validateCheckout } from "../utils/checkoutValidation";

import Container from "../../../3_components/common/Container";
import PromoBanner from "../../../3_components/common/PromoBanner";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";

const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { cart, fetchCart } = useCart();

  const { addresses, fetchAddresses } = useAddress();

  const { placeOrder, loading } = useCheckout();

  const { createRazorpayOrder, verifyPayment } = usePayment();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("Home Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [customerNote, setCustomerNote] = useState("");

  // ===================================================
  // Load Cart & Addresses
  // ===================================================

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, [fetchCart, fetchAddresses]);

  // ===================================================
  // Select Default Address
  // ===================================================

  useEffect(() => {
    if (addresses.length === 0) return;

    const defaultAddress =
      addresses.find((address) => address.is_default) || addresses[0];

    setSelectedAddress(defaultAddress.id);
  }, [addresses]);

  // ===================================================
  // Checkout
  // ===================================================

  const handleCheckout = async () => {
    const validationError = validateCheckout({
      cart,
      selectedAddress,
      paymentMethod,
    });

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await processCheckout({
        cart,
        user,
        selectedAddress,
        deliveryMethod,
        paymentMethod,
        customerNote,
        placeOrder,
        createRazorpayOrder,
        verifyPayment,
        fetchCart,
        navigate,
        toast,
      });
    } catch (error) {
      toast.error(error.message || error || "Unable to place order.");
    }
  };

  // ===================================================
  // Loading
  // ===================================================

  if (!cart) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-orange-50 py-24">
        <LoadingSpinner text="Preparing your checkout..." />
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        {/* ====================================================== */}
        {/* Checkout Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="🛍 Secure Checkout"
          title="Complete Your Order"
          description="You're just one step away from enjoying freshly prepared homemade food delivered right to your doorstep."
          stats={[
            { value: cart.total_items, label: "Items" },
            { value: `₹${Number(cart.grand_total).toFixed(0)}`, label: "Payable" },
          ]}
        />

        <div className="mt-10 grid gap-10 xl:grid-cols-[1.7fr_460px]">
          {/* Left */}

          <div className="space-y-8">
            {/* Address */}

            <div className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-lg sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
                    Delivery Address
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Select where you'd like your order delivered.
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-100 p-4">
                  <MapPin className="text-orange-500" size={28} />
                </div>
              </div>

              {addresses.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50 p-8 text-center">
                  <p className="font-semibold text-gray-800">
                    You don't have any saved addresses yet.
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Add a delivery address to continue with your order.
                  </p>

                  <Link
                    to="/addresses"
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    <PlusCircle size={18} />
                    Add Address
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`group relative flex cursor-pointer gap-5 rounded-3xl border-2 p-6 transition-all duration-300 ${
                        selectedAddress === address.id
                          ? "border-orange-500 bg-orange-50 shadow-lg"
                          : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-orange-100 p-3">
                              <Home size={20} className="text-orange-500" />
                            </div>

                            <div>
                              <h3 className="text-xl font-black text-gray-900">
                                {address.full_name}
                              </h3>

                              {address.is_default && (
                                <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                  Default Address
                                </span>
                              )}
                            </div>
                          </div>

                          {selectedAddress === address.id && (
                            <CheckCircle2 size={28} className="text-orange-500" />
                          )}
                        </div>

                        <div className="mt-5 space-y-2 text-gray-600">
                          <p>{address.address_line_1}</p>

                          {address.address_line_2 && (
                            <p>{address.address_line_2}</p>
                          )}

                          <p>
                            {address.city}, {address.state}
                          </p>

                          <p>{address.postal_code}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery */}

            <DeliveryMethod value={deliveryMethod} onChange={setDeliveryMethod} />

            {/* Payment */}

            <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />

            {/* Note */}

            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
              <label className="mb-3 block text-lg font-black text-gray-900">
                Customer Note
              </label>

              <textarea
                rows={4}
                className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                placeholder="Any special instructions?"
                value={customerNote}
                onChange={(event) => setCustomerNote(event.target.value)}
              />
            </div>
          </div>

          {/* Right */}

          <CheckoutSummary
            cart={cart}
            loading={loading}
            paymentMethod={paymentMethod}
            onCheckout={handleCheckout}
          />
        </div>
      </Container>
    </section>
  );
};

export default Checkout;