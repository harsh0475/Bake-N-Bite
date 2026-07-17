import {
  loadRazorpay,
  openRazorpayCheckout,
} from "../../payment/services/razorpayService";

// ======================================================
// Checkout Handler
// ======================================================

export const processCheckout = async ({
  cart,
  user,

  selectedAddress,
  deliveryMethod,
  paymentMethod,
  customerNote,

  placeOrder,
  createRazorpayOrder,
  verifyPayment,

  // Refreshes the Redux cart state. The backend clears the cart the
  // moment the order is created, so we re-sync here — this is what
  // makes the navbar/bottom-nav cart badge disappear immediately
  // instead of only updating once the Cart page is opened.
  fetchCart,

  navigate,
  toast,
}) => {

  // ======================================================
  // Load Razorpay SDK
  // ======================================================

  if (paymentMethod === "Razorpay") {

    const loaded =
      await loadRazorpay();

    if (!loaded) {
      throw new Error(
        "Unable to load Razorpay."
      );
    }

  }

  // ======================================================
  // Create Order
  // ======================================================

  const order =
    await placeOrder({

      address_id:
        selectedAddress,

      delivery_method:
        deliveryMethod,

      payment_method:
        paymentMethod,

      customer_note:
        customerNote,

    });

  // ======================================================
  // Refresh Cart
  // ======================================================
  // The order has been created, so the backend has already cleared
  // the cart — sync Redux now, before branching into COD/Razorpay,
  // so it's covered regardless of payment outcome.

  if (fetchCart) {

    try {

      await fetchCart();

    } catch {

      // Non-fatal — the order itself already succeeded.

    }

  }

  // ======================================================
  // Cash On Delivery
  // ======================================================

  if (paymentMethod === "Cash On Delivery") {

    toast.success(
      "Order placed successfully."
    );

    navigate(
      `/orders/${order.id}`
    );

    return;

  }

  // ======================================================
  // Razorpay Order
  // ======================================================

  const razorpayOrder =
    await createRazorpayOrder(
      order.id
    );

  // ======================================================
  // Open Razorpay Checkout
  // ======================================================

  openRazorpayCheckout({

    order: razorpayOrder,

    customer: {

      name:
        razorpayOrder.customer?.name ||
        user?.full_name ||
        "",

      email:
        user?.email ||
        "",

      phone:
        razorpayOrder.customer?.phone ||
        user?.phone ||
        "",

    },

    // ====================================================
    // Payment Success
    // ====================================================

    onSuccess: async (
      response
    ) => {

      try {

        await verifyPayment({

          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_signature:
            response.razorpay_signature,

        });

        toast.success(
          "Payment Successful"
        );

        navigate(
          `/orders/${order.id}`
        );

      } catch (error) {

        toast.error(
          error ||
          "Payment verification failed."
        );

      }

    },

    // ====================================================
    // Payment Failed / Cancelled
    // ====================================================

    onFailure: () => {

      toast.info(
        "Payment cancelled. You can retry payment later from My Orders."
      );

      navigate(
        `/orders/${order.id}`
      );

    },

  });

};