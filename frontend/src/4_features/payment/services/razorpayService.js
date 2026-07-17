// ======================================================
// Load Razorpay SDK
// ======================================================

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

// ======================================================
// Open Razorpay Checkout
// ======================================================

export const openRazorpayCheckout = ({
  order,
  customer,
  onSuccess,
  onFailure,
}) => {
  const options = {
    key: order.key,

    amount: order.amount,

    currency: order.currency,

    name: "Bake N Bite",

    description: "Food Order",

    order_id: order.order_id,

    prefill: {
      name: customer.name,

      email: customer.email,

      contact: customer.phone,
    },

    theme: {
      color: "#f97316",
    },

    handler: onSuccess,

    modal: {
      ondismiss: onFailure,
    },
  };

  const razorpay = new window.Razorpay(
    options
  );

  razorpay.open();
};